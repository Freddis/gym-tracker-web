import {OpenApiMethod} from 'snap-on-openapi';
import {weightValidator} from './validators/weightValidator';
import {number, object} from 'zod';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';
import {EntryVisibility} from '../../../EntryService/types/EntryVisibility';

export const createWeight = RouteFactory.createRoute({
  method: OpenApiMethod.POST,
  type: ApiRouteType.User,
  description: 'Adds new weight entry for the user',
  path: '/',
  validators: {
    body: object({
      weight: number().openapi({
        description: 'Weight value',
      }),
    }),
    response: weightValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.entry.createWeightEntry(ctx.viewer.id, {
      weight: ctx.params.body.weight,
      visibility: EntryVisibility.Public,
    });
    return result.weight;
  },
});
