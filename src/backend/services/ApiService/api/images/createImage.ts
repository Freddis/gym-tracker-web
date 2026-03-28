import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'snap-on-openapi';
import {RouteFactory} from '../../utils/RouteFactory';
import {object, string} from 'zod';
import {EntryVisibility} from '../../../EntryService/types/EntryVisibility';
import {imageEntryValidator} from './validators/imageEntryValidator';

export const createImage = RouteFactory.createRoute({
  method: OpenApiMethod.POST,
  type: ApiRouteType.User,
  description: 'Adds new image entry for the user',
  path: '/',
  validators: {
    body: object({
      data: string().nonempty('Data cannot be empty').openapi({description: 'Data of the image. Base64 encoded string'}),
    }),
    response: imageEntryValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.entry.createImageEntry(ctx.viewer.id, {
      data: ctx.params.body.data,
      visibility: EntryVisibility.Public,
    });
    return result;
  },
});
