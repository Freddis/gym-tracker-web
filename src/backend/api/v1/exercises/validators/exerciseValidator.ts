import {object, nativeEnum} from 'zod';
import {Muscle} from '../../../../../common/enums/Muscle';
import {exerciseRowValidator} from '../../../../services/DrizzleService/types/ExerciseRow';

const baseExerciseValidator = exerciseRowValidator.extend({
  muscles: object({
    primary: nativeEnum(Muscle).array(),
    secondary: nativeEnum(Muscle).array(),
  }),
});
export const exerciseValidator = baseExerciseValidator.extend({
  variations: baseExerciseValidator.array(),
}).openapi({ref: 'Exercise'});
