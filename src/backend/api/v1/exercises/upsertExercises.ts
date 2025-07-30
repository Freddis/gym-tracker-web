import {z} from 'zod';
import {ApiRouteType} from 'src/common/types/ApiRouteType';
import {OpenApiMethod} from 'strap-on-openapi';
import {openApi} from '../../../utils/openApi';
import {exerciseUpsertDtoValidator} from './validators/exerciseUpsertDtoValidator';
import {exerciseRowValidator} from '../../../services/DrizzleService/types/ExerciseRow';

export const upsertExercises = openApi.factory.createRoute({
  method: OpenApiMethod.PUT,
  type: ApiRouteType.User,
  description: 'Updates or inserts exercise in users personal library',
  path: '/',
  validators: {
    body: z.object({
      items: exerciseUpsertDtoValidator.array(),
    }),
    response: z.object({
      items: exerciseRowValidator.array(),
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.exercise.upsert(ctx.viewer.id, ctx.params.body.items);
    return {items: result};
  },
});
