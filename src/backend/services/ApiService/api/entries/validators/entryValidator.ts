import {literal, number, object, union} from 'zod';
import {EntryType} from '../../../../EntryService/types/EntryType';
import {userValidator} from '../../users/validators/userValidator';
import {workoutValidator} from '../../workouts/validators/workoutValidator';
import {weightValidator} from '../../weight/validators/weightValidator';

const baseEntryValidator = object({
  id: number().openapi({description: 'Id of an entry'}),
  user: userValidator,
});

// todo: either create a new PR in openapi-ts to fix this, or delete this code
// const workoutEntryValidator = baseEntryValidator.extend({
//   type: literal(EntryType.Workout),
//   content: workoutValidator,
// }).openapi({ref: 'WorkoutEntry'}); ;

// const weightEntryValidator = baseEntryValidator.extend({
//   type: literal(EntryType.Weight),
//   content: weightValidator,
// }).openapi({ref: 'WeightEntry'});

// export const entryValidator = union([
//   workoutEntryValidator,
//   weightEntryValidator,
// ]).openapi({ref: 'Entry'});


export const entryValidator = baseEntryValidator.extend({
  type: union([
    literal(EntryType.Weight),
    literal(EntryType.Workout),
  ]).openapi({description: 'Entry type'}),
  weight: weightValidator.optional().openapi({description: 'Weight. Only for weight entries'}),
  workout: workoutValidator.optional().openapi({description: 'Workout. Only for workout entries.'}),
}).openapi({ref: 'Entry'});
