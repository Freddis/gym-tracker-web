import {object, nativeEnum} from 'zod';
import {exerciseRowValidator} from '../../../../DrizzleService/types/ExerciseRow';
import {Muscle} from '../../../../../../common/enums/Muscle';

const baseExerciseValidator = exerciseRowValidator.extend({
  muscles: object({
    primary: nativeEnum(Muscle).array(),
    secondary: nativeEnum(Muscle).array(),
  }),
});
export const exerciseValidator = baseExerciseValidator.extend({
  variations: baseExerciseValidator.array(),
}).openapi({ref: 'Exercise'});
