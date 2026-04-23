import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'snap-on-openapi';
import {RouteFactory} from '../../utils/RouteFactory';
import {object, string} from 'zod';
import {EntryVisibility} from '../../../EntryService/types/EntryVisibility';
import {postEntryValidator} from './validators/postEntryValidator';

export const createPost = RouteFactory.createRoute({
  method: OpenApiMethod.POST,
  type: ApiRouteType.User,
  description: 'Adds new post entry for the user',
  path: '/',
  validators: {
    body: object({
      note: string().nullable().openapi({description: 'Text of the post'}),
      data: string().nullable().openapi({description: 'Data of the image. Base64 encoded string'}),
      time: RouteFactory.validators.strings.datetime.openapi({description: 'Time of the post'}),
    }),
    response: postEntryValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.entry.createPostEntry(ctx.viewer.id, {
      data: ctx.params.body.data,
      note: ctx.params.body.note,
      visibility: EntryVisibility.Public,
      time: ctx.params.body.time,
    });
    return result;
  },
});
