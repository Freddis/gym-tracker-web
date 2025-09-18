import {object, string} from 'zod';
import {OpenApiMethod} from 'snap-on-openapi';
import {ApiRouteType} from '../../../types/ApiRouteType';
import {RouteFactory} from '../../../utils/RouteFactory';
import {emptyOperationResponse} from '../../../validators/emptyOperationResponse';

export const updateManagedExercise = RouteFactory.createRoute({
  method: OpenApiMethod.PATCH,
  type: ApiRouteType.Manager,
  description: 'Updates exercise',
  path: '/{id}',
  validators: {
    path: object({
      id: RouteFactory.validators.strings.number.openapi({description: 'Id of the excercise'}),
    }),
    body: object({
      name: string().nonempty('Name cannot be empty').openapi({description: 'Name of the exercise'}),
      description: string().nullable().openapi({description: 'Description of the exercise'}),
      image: string().optional().openapi({description: 'Image for the exercise'}),
    }),
    response: emptyOperationResponse,
  },
  handler: async (ctx) => {
    await ctx.services.models.exercise.update(ctx.params.path.id, ctx.params.body);
    return {success: true};
  },
});
