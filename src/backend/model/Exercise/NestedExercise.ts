import {nativeEnum, object, TypeOf} from 'zod';
import {exerciseValidator} from './Exercise';
import {Muscle} from '../../../common/enums/Muscle';

export const baseNestedExerciseValidator = exerciseValidator.extend({
  muscles: object({
    primary: nativeEnum(Muscle).array(),
    secondary: nativeEnum(Muscle).array(),
  }),
});
export const nestedExerciseValidator = baseNestedExerciseValidator.extend({
  variations: baseNestedExerciseValidator.array(),
}).openapi({ref: 'NestedExercise'});
export type NestedExerciseValidator = typeof nestedExerciseValidator;
export type NestedExercise = TypeOf<NestedExerciseValidator>
