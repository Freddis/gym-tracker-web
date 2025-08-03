import {object, string, union, nativeEnum} from 'zod';
import {Muscle} from '../../../../../../common/enums/Muscle';
import {RouteFactory} from '../../../utils/RouteFactory';
import {Equipment} from '../../../../../../common/enums/Equipment';

export const getExerciseListQueryValidator = object({
  page: RouteFactory.validators.strings.number.optional().default('1').openapi({description: 'Page'}),
  filter: string().optional().openapi({description: 'Filters exercises by name'}),
  muscle: union([
    nativeEnum(Muscle).array(),
    nativeEnum(Muscle).transform((x) => [x]),
  ]).optional().openapi({description: 'Filters excercises by muscles. Exercise must involve all muscles from the list.'}),
  equipment: nativeEnum(Equipment).optional().openapi({description: 'Filters excercises by equipment'}),
});
