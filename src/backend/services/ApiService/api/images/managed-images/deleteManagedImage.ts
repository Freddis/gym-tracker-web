import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'snap-on-openapi';
import {RouteFactory} from '../../../utils/RouteFactory';
import {object} from 'zod';
import {emptyOperationResponse} from '../../../validators/emptyOperationResponse';

export const deleteManagedImage = RouteFactory.createRoute({
  method: OpenApiMethod.DELETE,
  type: ApiRouteType.Manager,
  description: 'Deletes image',
  path: '/{id}',
  validators: {
    path: object({
      id: RouteFactory.validators.strings.number.openapi({description: 'Id of the image'}),
    }),
    response: emptyOperationResponse,
  },
  handler: async (ctx) => {
    await ctx.services.image.deleteById(ctx.params.path.id);
    return {success: true};
  },
});
