import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'strap-on-openapi';
import {exerciseRowValidator} from '../../../DrizzleService/types/ExerciseRow';
import {exerciseUpsertDtoValidator} from './validators/exerciseUpsertDtoValidator';
import {RouteFactory} from '../../utils/RouteFactory';
import {object} from 'zod';

export const upsertExercises = RouteFactory.createRoute({
  method: OpenApiMethod.PUT,
  type: ApiRouteType.User,
  description: 'Updates or inserts exercise in users personal library',
  path: '/',
  validators: {
    body: object({
      items: exerciseUpsertDtoValidator.array(),
    }),
    response: object({
      items: exerciseRowValidator.array(),
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.exercise.upsert(ctx.viewer.id, ctx.params.body.items);
    return {items: result};
  },
});
