import {boolean, object, string} from 'zod';
import {OpenApiMethod} from 'snap-on-openapi';
import {ApiRouteType} from '../../../types/ApiRouteType';
import {RouteFactory} from '../../../utils/RouteFactory';
import {emptyOperationResponse} from '../../../validators/emptyOperationResponse';
import {excerciseValidatorDescriptions, exerciseValidator} from '../validators/exerciseValidator';

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
      name: string().optional().openapi({description: excerciseValidatorDescriptions.name}),
      description: string().optional().nullable().openapi({description: excerciseValidatorDescriptions.description}),
      image: string().optional().openapi({description: 'Image for the exercise. Base64 encoded string'}),
      isArchived: boolean().optional().openapi({description: excerciseValidatorDescriptions.isArchived}),
      muscles: exerciseValidator.shape.muscles.optional().openapi({description: excerciseValidatorDescriptions.muscles}),
    }),
    response: emptyOperationResponse,
  },
  handler: async (ctx) => {
    await ctx.services.models.exercise.update(ctx.params.path.id, ctx.params.body);
    return {success: true};
  },
});
