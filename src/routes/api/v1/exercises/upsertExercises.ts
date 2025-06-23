import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {ApiRouteType} from 'src/common/types/ApiRouteType';
import {exerciseUpsertDtoValidator} from 'src/backend/model/Exercise/ExerciseUpsertDto';
import {exerciseValidator} from 'src/backend/model/Exercise/Exercise';
import {OpenApiMethods} from 'strap-on-openapi';

export const upsertExercises = openApiInstance.factory.createRoute({
  method: OpenApiMethods.put,
  type: ApiRouteType.User,
  description: 'Updates or inserts exercise in users personal library',
  path: '/',
  validators: {
    body: z.object({
      items: exerciseUpsertDtoValidator.array(),
    }),
    response: z.object({
      items: exerciseValidator.array(),
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.exercise.upsert(ctx.viewer.id, ctx.params.body.items);
    return {items: result};
  },
});
