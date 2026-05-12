import {date, object, string} from 'zod';
import {userValidator} from '../../users/validators/userValidator';
import {workoutValidator} from '../../workouts/validators/workoutValidator';
import {weightValidator} from '../../weight/validators/weightValidator';
import {imageValidator} from '../../images/validators/imageValidator';
import {externalSourceValidator} from './externalSourceValidator';
import {outdoorRunValidator} from './outdoorRunValidator';
import {outdoorWalkValidator} from './outdoorWalkValidator';
import {entryTypeValidator} from './entryTypeValidator';
import {entryVisibilityValidator} from './entryVisibilityValidator';
import {mealValidator} from './mealValidator';

const baseEntryValidator = object({
  id: string().openapi({description: 'Id of an entry'}),
  user: userValidator,
  visibility: entryVisibilityValidator,
  time: date().openapi({description: 'Time of the entry. Can be changed by user.'}),
  createdAt: date().openapi({description: 'Date of the entry, when the entry was created by user. Immutable.'}),
  updatedAt: date().nullable().openapi({description: 'Date of the last update'}),
  deletedAt: date().nullable().openapi({description: 'Date of the deletion'}),
  title: string().nullable().openapi({description: 'Title of the entry'}),
  note: string().nullable().openapi({description: 'Note of the entry'}),
  externalId: string().nullable().openapi({description: 'External id of the entry'}),
  externalSource: externalSourceValidator.nullable().openapi({description: 'External source of the entry. Another app.'}),
});

export const entryValidator = baseEntryValidator.extend({
  type: entryTypeValidator,
  weight: weightValidator.optional().openapi({description: 'Weight. Only for weight entries'}),
  workout: workoutValidator.optional().openapi({description: 'Workout. Only for workout entries.'}),
  image: imageValidator.optional().nullable().openapi({description: 'Image. Only for image entries.'}),
  outdoorRun: outdoorRunValidator.optional().openapi({description: 'Outdoor run. Only for outdoor run entries.'}),
  outdoorWalk: outdoorWalkValidator.optional().openapi({description: 'Outdoor walk. Only for outdoor walk entries.'}),
  meal: mealValidator.optional().openapi({description: 'Meal. Only for meal entries.'}),
}).openapi({ref: 'Entry', description: 'Entry. Can be a wirkout entry, a weight entry and so on.'});
