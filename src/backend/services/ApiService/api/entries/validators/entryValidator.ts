import {date, nativeEnum, number, object, string} from 'zod';
import {EntryType} from '../../../../EntryService/types/EntryType';
import {userValidator} from '../../users/validators/userValidator';
import {workoutValidator} from '../../workouts/validators/workoutValidator';
import {weightValidator} from '../../weight/validators/weightValidator';
import {EntryVisibility} from '../../../../EntryService/types/EntryVisibility';
import {imageValidator} from '../../images/validators/imageValidator';
import {ExternalSource} from '../../../../EntryService/types/ExternalSource';

const baseEntryValidator = object({
  id: number().openapi({description: 'Id of an entry'}),
  user: userValidator,
  visibility: nativeEnum(EntryVisibility).openapi({description: 'Visibility of the entry', ref: 'Entry Visibility'}),
  time: date().openapi({description: 'Time of the entry. Can be changed by user.'}),
  createdAt: date().openapi({description: 'Date of the entry, when the entry was created by user. Immutable.'}),
  updatedAt: date().nullable().openapi({description: 'Date of the last update'}),
  deletedAt: date().nullable().openapi({description: 'Date of the deletion'}),
  title: string().nullable().openapi({description: 'Title of the entry'}),
  note: string().nullable().openapi({description: 'Note of the entry'}),
  externalId: string().nullable().openapi({description: 'External id of the entry'}),
  externalSource: nativeEnum(ExternalSource).nullable().openapi({description: 'External source of the entry'}),
});

export const entryValidator = baseEntryValidator.extend({
  type: nativeEnum(EntryType).openapi({description: 'Entry type', ref: 'Entry Type'}),
  weight: weightValidator.optional().openapi({description: 'Weight. Only for weight entries'}),
  workout: workoutValidator.optional().openapi({description: 'Workout. Only for workout entries.'}),
  image: imageValidator.optional().nullable().openapi({description: 'Image. Only for image entries.'}),
}).openapi({ref: 'Entry', description: 'Entry. Can be a wirkout entry, a weight entry and so on.'});
