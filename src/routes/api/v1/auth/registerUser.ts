import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {OpenApiMethods} from 'src/backend/services/OpenApiService/enums/OpenApiMethods';
import {AppOpenApiRouteTypes} from 'src/common/types/AppOpenApiRouteTypes';

export const registerUser = openApiInstance.factory.createRoute({
  method: OpenApiMethods.post,
  type: AppOpenApiRouteTypes.Public,
  description: 'Registers a user',
  path: '/register',
  validators: {
    body: z.object({
      name: z.string().nonempty(),
      email: z.string().email(),
      password: z.string().min(5),
      passwordConfirmation: z.string().nonempty(),
    }),
    response: z.object({
      id: z.number(),
      email: z.string(),
      name: z.string(),
      jwt: z.string(),
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.auth.register(ctx.params.body);
    return result;
  },
});
