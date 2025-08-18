import {OpenApiMethod} from 'strap-on-openapi';
import {weightValidator} from './validators/weightValidator';
import {number, object} from 'zod';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';
import {EntryType} from '../../../EntryService/types/EntryType';
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
      type: EntryType.Weight,
      weight: ctx.params.body.weight,
      visibility: EntryVisibility.Public,
    });
    return result.weight;
  },
});
