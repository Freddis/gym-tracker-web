import {OpenApiMethod} from 'snap-on-openapi';
import {weightValidator} from './validators/weightValidator';
import {object} from 'zod';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';
import {ApiError} from '../../errors/ApiError';
import {ApiErrorCode} from '../../types/ApiErrorCode';
import {EntryType} from '../../../EntryService/types/EntryType';

export const getWeight = RouteFactory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.User,
  description: 'Gets own weight entry for the user',
  path: '/{id}',
  validators: {
    path: object({
      id: RouteFactory.validators.strings.number.openapi({description: 'Id of the weight record'}),
    }),
    response: weightValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.entry.get({
      weightIds: [ctx.params.path.id],
      userId: [ctx.viewer.id],
      type: [EntryType.Weight],
    });
    if (!result) {
      throw new ApiError(ApiErrorCode.NotFound);
    }
    return result.weight;
  },
});
