import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'snap-on-openapi';
import {RouteFactory} from '../../utils/RouteFactory';
import {object, string} from 'zod';
import {EntryVisibility} from '../../../EntryService/types/EntryVisibility';
import {imageEntryValidator} from './validators/imageEntryValidator';

export const updateImage = RouteFactory.createRoute({
  method: OpenApiMethod.PATCH,
  type: ApiRouteType.User,
  description: 'Updates image entry for the user',
  path: '/{id}',
  validators: {
    path: object({
      id: RouteFactory.validators.strings.number.openapi({description: 'Id of the image entry'}),
    }),
    body: object({
      data: string().optional().openapi({description: 'Data of the image. Base64 encoded string'}),
    }),
    response: imageEntryValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.entry.updateImageEntry(ctx.viewer.id, ctx.params.path.id, {
      data: ctx.params.body.data,
      visibility: EntryVisibility.Public,
    });
    return result;
  },
});
