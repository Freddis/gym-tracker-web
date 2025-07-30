import {boolean, object, string} from 'zod';
import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'strap-on-openapi';
import {RouteFactory} from '../../utils/RouteFactory';


export const createExercise = RouteFactory.createRoute({
  method: OpenApiMethod.POST,
  type: ApiRouteType.User,
  description: 'Adds new exercise to the user personal library',
  path: '/',
  validators: {
    body: object({
      name: string(),
    }),
    response: object({
      success: boolean(),
    }),
  },
  handler: async (ctx) => {
    await ctx.services.models.exercise.create({
      userId: ctx.viewer.id,
      name: ctx.params.body.name,
    });
    return {success: true};
  },
});
