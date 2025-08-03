import {object, nativeEnum} from 'zod';
import {exerciseRowValidator} from '../../../../DrizzleService/types/ExerciseRow';
import {Muscle} from '../../../../../../common/enums/Muscle';
import {RouteFactory} from '../../../utils/RouteFactory';
import {Equipment} from '../../../../../../common/enums/Equipment';
import {Exercise} from '../../../../ExerciseService/types/Exercise';
import {OpenApiDescriptions} from '../../../types/OpenApiDescriptions';

export const excerciseValidatorDescriptions: OpenApiDescriptions<Exercise> = {
  params: 'Types of the parameters, such as: weight, reps, duration',
  id: 'Id of the exercise',
  name: 'Exercise Name',
  description: 'Description and instructions on how to perform this exercise',
  difficulty: 'How difficult is this exercise',
  equipment: 'Equipmnet required to perform exercise',
  images: 'List of images for this exercise',
  userId: 'Id of the user excercise belongs to',
  copiedFromId: 'Id of exercise from built-in library this excersize was copied from. Only relevant to exercises created by users',
  parentExerciseId: 'Id of the parent exercises. If this id is not NULL then this excercise is a variation of another exercise',
  createdAt: 'Date the creation',
  updatedAt: 'Date of last update',
  deletedAt: 'Date of deletion. Deleted exercises are not accessible to users.',
  muscles: 'List of muscles involved in this excercise',
  variations: 'List of variations of this excercise. This nesting is usually used to avoid cluttering in lists on the frontend side.',
};

const muscleValidator = nativeEnum(Muscle).openapi({ref: 'Muscle', description: 'Body Muscle'});
const equipmentValidator = nativeEnum(Equipment).openapi({ref: 'Equipment', description: 'Gym Equipment'});
const rawBaseExerciseValidator = exerciseRowValidator.extend({
  equipment: equipmentValidator.nullable(),
  muscles: object({
    primary: muscleValidator.array().openapi({description: 'List of primary muscles this exercise targets'}),
    secondary: muscleValidator.array().openapi({description: 'List of secondary muscles this exercise targets'}),
  }).openapi({description: 'List of muscles involved in this excercise'}),
});
const baseExerciseValidator = RouteFactory.validators.describeShape(rawBaseExerciseValidator, excerciseValidatorDescriptions);

const validator = baseExerciseValidator.extend({
  variations: baseExerciseValidator.array().openapi({
    description: 'List of variations of this excercise. This nesting is usually used to avoid cluttering in lists on the frontend side.',
  }),
});
export const exerciseValidator = RouteFactory.validators.describeShape(
  validator, excerciseValidatorDescriptions
).openapi({ref: 'Exercise', description: 'Exercise. Either from built-in library or created by a user.'});


