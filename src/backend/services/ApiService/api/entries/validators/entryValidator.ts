import {date, nativeEnum, number, object} from 'zod';
import {EntryType} from '../../../../EntryService/types/EntryType';
import {userValidator} from '../../users/validators/userValidator';
import {workoutValidator} from '../../workouts/validators/workoutValidator';
import {weightValidator} from '../../weight/validators/weightValidator';
import {EntryVisibility} from '../../../../EntryService/types/EntryVisibility';
import {imageValidator} from '../../images/validators/imageValidator';

const baseEntryValidator = object({
  id: number().openapi({description: 'Id of an entry'}),
  user: userValidator,
  visibility: nativeEnum(EntryVisibility).openapi({description: 'Visibility of the entry', ref: 'Entry Visibility'}),
  createdAt: date().openapi({description: 'Date of the entry'}),
  updatedAt: date().nullable().openapi({description: 'Date of the last update'}),
  deletedAt: date().nullable().openapi({description: 'Date of the deletion'}),
});

export const entryValidator = baseEntryValidator.extend({
  type: nativeEnum(EntryType).openapi({description: 'Entry type', ref: 'Entry Type'}),
  weight: weightValidator.optional().openapi({description: 'Weight. Only for weight entries'}),
  workout: workoutValidator.optional().openapi({description: 'Workout. Only for workout entries.'}),
  image: imageValidator.optional().openapi({description: 'Image. Only for image entries.'}),
}).openapi({ref: 'Entry', description: 'Entry. Can be a wirkout entry, a weight entry and so on.'});
