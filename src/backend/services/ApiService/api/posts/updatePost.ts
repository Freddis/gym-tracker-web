import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'snap-on-openapi';
import {RouteFactory} from '../../utils/RouteFactory';
import {object, string} from 'zod';
import {EntryVisibility} from '../../../EntryService/types/EntryVisibility';
import {postEntryValidator} from './validators/postEntryValidator';

export const updatePost = RouteFactory.createRoute({
  method: OpenApiMethod.PATCH,
  type: ApiRouteType.User,
  description: 'Updates post entry for the user',
  path: '/{id}',
  validators: {
    path: object({
      id: RouteFactory.validators.strings.number.openapi({description: 'Id of the post entry'}),
    }),
    body: object({
      data: string().optional().openapi({description: 'Data of the image. Base64 encoded string'}),
      note: string().nullable().openapi({description: 'Text of the post'}),
      time: RouteFactory.validators.strings.datetime.openapi({description: 'Time of the post'}),
    }),
    response: postEntryValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.entry.updatePostEntry(ctx.viewer.id, ctx.params.path.id, {
      data: ctx.params.body.data,
      note: ctx.params.body.note,
      visibility: EntryVisibility.Public,
      time: ctx.params.body.time,
    });
    return result;
  },
});
