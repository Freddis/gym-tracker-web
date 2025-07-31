import {object, string, union, nativeEnum} from 'zod';
import {Muscle} from '../../../../../../common/enums/Muscle';
import {RouteFactory} from '../../../utils/RouteFactory';

export const getExerciseListQueryValidator = object({
  page: RouteFactory.validators.strings.number.optional().default('1'),
  filter: string().optional(),
  muscle: union([
    nativeEnum(Muscle).array(),
    nativeEnum(Muscle).transform((x) => [x]),
  ]).optional(),
});
