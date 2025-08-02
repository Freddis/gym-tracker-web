import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'strap-on-openapi';
import {exerciseUpsertDtoValidator} from './validators/exerciseUpsertDtoValidator';
import {RouteFactory} from '../../utils/RouteFactory';
import {object} from 'zod';
import {exerciseValidator} from './validators/exerciseValidator';

export const upsertExercises = RouteFactory.createRoute({
  method: OpenApiMethod.PUT,
  type: ApiRouteType.User,
  description: 'Updates or inserts exercise in users personal library',
  path: '/',
  validators: {
    body: object({
      items: exerciseUpsertDtoValidator.array().openapi({description: 'List of exercises that contain updated fields'}),
    }),
    response: object({
      items: exerciseValidator.array().openapi({description: 'List of updated exercises'}),
    }).openapi({description: "List of updated exercises containing internal ids to match on device's database"}),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.exercise.upsert(ctx.viewer.id, ctx.params.body.items);
    return {items: result};
  },
});
