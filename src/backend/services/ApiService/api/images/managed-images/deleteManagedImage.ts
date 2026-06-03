import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'snap-on-openapi';
import {RouteFactory} from '../../../utils/RouteFactory';
import {object, string} from 'zod';
import {emptyOperationResponse} from '../../../validators/emptyOperationResponse';
import {RouteTag} from '../../../types/RouteTag';

export const deleteManagedImage = RouteFactory.createRoute({
  method: OpenApiMethod.DELETE,
  type: ApiRouteType.Manager,
  description: 'Deletes image',
  path: '/{id}',
  tags: [RouteTag.CrmImages],
  validators: {
    path: object({
      id: string().uuid().openapi({description: 'Id of the image'}),
    }),
    response: emptyOperationResponse,
  },
  handler: async (ctx) => {
    await ctx.services.image.deleteById(ctx.params.path.id);
    return {success: true};
  },
});
