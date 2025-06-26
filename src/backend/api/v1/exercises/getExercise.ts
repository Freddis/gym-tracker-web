import {OpenApiMethods} from 'strap-on-openapi';
import {z} from 'zod';
import {ApiRouteType} from '../../../../common/types/ApiRouteType';
import {exerciseValidator} from '../../../model/Exercise/Exercise';
import {ApiError} from '../../../services/ApiService/errors/ApiError';
import {ApiErrorCode} from '../../../services/ApiService/types/ApiErrorCode';
import {openApiInstance} from '../../../utils/openApiInstance';


export const getExercise = openApiInstance.factory.createRoute({
  method: OpenApiMethods.GET,
  type: ApiRouteType.User,
  description: 'Returns data on an exercise available to the user',
  path: '/{id}',
  validators: {
    path: z.object({
      id: z.number(),
    }),
    response: z.object({
      item: exerciseValidator,
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.exercise.get(ctx.params.path.id, ctx.viewer.id);
    if (!result) {
      throw new ApiError(ApiErrorCode.UnknownError);
    }
    return {
      item: result,
    };
  },
});
