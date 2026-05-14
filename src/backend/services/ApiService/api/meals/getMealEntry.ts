import {OpenApiMethod} from 'snap-on-openapi';
import {object, string} from 'zod';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';
import {ApiErrorCode} from '../../types/ApiErrorCode';
import {ApiError} from '../../errors/ApiError';
import {EntryType} from '../../../EntryService/types/EntryType';
import {entryValidator} from '../entries/validators/entryValidator';

export const getMealEntry = RouteFactory.createRoute({
  type: ApiRouteType.User,
  method: OpenApiMethod.GET,
  path: '/{id}',
  description: 'Returns the meal entry',
  validators: {
    path: object({
      id: string().openapi({description: 'Id of the meal entry'}),
    }),
    response: entryValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.entry.getAll({
      userId: [ctx.viewer.id],
      ids: [ctx.params.path.id],
      type: [EntryType.Meal],
    });
    const mealEntry = result.items[0];
    if (!mealEntry) {
      throw new ApiError(ApiErrorCode.NotFound);
    }
    return mealEntry;
  },
});
