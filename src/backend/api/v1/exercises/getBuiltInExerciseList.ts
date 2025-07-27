import {string, object, nativeEnum, union} from 'zod';
import {ApiRouteType} from 'src/common/types/ApiRouteType';
import {OpenApiMethod} from 'strap-on-openapi';
import {openApi} from '../../../utils/openApi';
import {nestedExerciseValidator} from '../../../model/Exercise/NestedExercise';
import {Muscle} from '../../../../common/enums/Muscle';


export const getBuiltInExerciseList = openApi.factory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.Public,
  description: 'Returns data on exercises available to the user',
  path: '/built-in',
  validators: {
    query: object({
      filter: string().optional(),
      muscle: union([
        nativeEnum(Muscle).array(),
        nativeEnum(Muscle).transform((x) => [x]),
      ]).optional(),
    }),
    response: object({
      items: nestedExerciseValidator.array(),
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.exercise.getAll(ctx.params.query);
    return {
      items: result,
    };
  },
});
