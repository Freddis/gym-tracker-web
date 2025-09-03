import {OpenApiMethod} from 'snap-on-openapi';
import {weightValidator} from './validators/weightValidator';
import {number, object, ZodError} from 'zod';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';

export const updateWeight = RouteFactory.createRoute({
  method: OpenApiMethod.PATCH,
  type: ApiRouteType.User,
  description: 'Updates own weight entry for the user',
  path: '/{id}',
  validators: {
    path: object({
      id: RouteFactory.validators.strings.number.openapi({description: 'Id of the weight record'}),
    }),
    body: object({
      weight: number().openapi({
        description: 'Weight value',
      }),
    }),
    response: weightValidator,
  },
  handler: async (ctx) => {
    const zodError = ZodError.create([]);
    zodError.addIssue({
      code: 'custom',
      path: ['weight'],
      message: 'Incorrect email or password',
    });
    const result = await ctx.services.models.weight.update(ctx.params.path.id, ctx.viewer.id, ctx.params.body);
    return result;
  },
});
