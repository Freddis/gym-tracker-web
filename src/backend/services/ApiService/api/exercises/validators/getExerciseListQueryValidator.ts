import {object, string, union, nativeEnum} from 'zod';
import {Muscle} from '../../../../../../common/enums/Muscle';

export const getExerciseListQueryValidator = object({
  filter: string().optional(),
  muscle: union([
    nativeEnum(Muscle).array(),
    nativeEnum(Muscle).transform((x) => [x]),
  ]).optional(),
});
