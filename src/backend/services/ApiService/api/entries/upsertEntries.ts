import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'snap-on-openapi';
import {object} from 'zod';
import {RouteFactory} from '../../utils/RouteFactory';
import {entryValidator} from './validators/entryValidator';
import {entryUpsertDtoValidator} from './validators/entryUpsertDtoValidator';

export const upsertEntries = RouteFactory.createRoute({
  method: OpenApiMethod.PUT,
  type: ApiRouteType.User,
  description: 'Updates or inserts entries for user',
  path: '/',
  validators: {
    body: object({
      items: entryUpsertDtoValidator.array().openapi({description: 'List of entries to update or insert'}),
    }),
    response: object({
      items: entryValidator.array().openapi({description: 'List of updated or inserted entries'}),
    }).openapi({description: 'List of updated or inserted entries'}),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.entry.upsert(ctx.viewer.id, ctx.params.body.items);
    return {items: result};
  },
});
