import {object, string} from 'zod';
import {OpenApiMethod} from 'snap-on-openapi';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';
import {translationValidator} from './validator/translationValidator';

export const updateTranslation = RouteFactory.createRoute({
  method: OpenApiMethod.PATCH,
  type: ApiRouteType.Manager,
  description: 'Updates translation',
  path: '/{id}',
  validators: {
    path: object({
      id: RouteFactory.validators.strings.number.openapi({description: 'Id of the translation'}),
    }),
    body: object({
      value: string().nonempty().openapi({description: 'Text of the translation'}),
    }),
    response: translationValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.translation.updateTranslationById(ctx.params.path.id, ctx.params.body.value);
    return result;
  },
});
