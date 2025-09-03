import {object, string, union, nativeEnum} from 'zod';
import {Muscle} from '../../../../../types/Muscle';
import {RouteFactory} from '../../../utils/RouteFactory';
import {Equipment} from '../../../../../types/Equipment';

export const getExerciseListQueryValidator = object({
  page: RouteFactory.validators.strings.number.optional().default('1').openapi({description: 'Page'}),
  filter: string().optional().openapi({description: 'Filters exercises by name'}),
  muscle: union([
    nativeEnum(Muscle).array(),
    nativeEnum(Muscle).transform((x) => [x]),
  ]).optional().openapi({description: 'Filters excercises by muscles. Exercise must involve all muscles from the list.'}),
  equipment: nativeEnum(Equipment).optional().openapi({description: 'Filters excercises by equipment'}),
  includeBuiltIn: RouteFactory.validators.strings.boolean.optional().openapi({description: 'Include built-in exercises into the response'}),
  updatedAfter: RouteFactory.validators.strings.datetime.optional().openapi({
    description: 'Only return exercises updated after this date. Used for syncing.',
  }),
});
