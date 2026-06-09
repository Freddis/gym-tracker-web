import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'snap-on-openapi';
import {RouteFactory} from '../../utils/RouteFactory';
import {foodValidator} from './validators/foodValidator';
import {number, object} from 'zod';
import {ApiError} from '../../errors/ApiError';
import {ApiErrorCode} from '../../types/ApiErrorCode';
import {RouteTag} from '../../types/RouteTag';

export const scanBarcode = RouteFactory.createRoute({
  method: OpenApiMethod.POST,
  type: ApiRouteType.User,
  description: 'Scans a barcode and returns data on food',
  path: '/barcode',
  tags: [RouteTag.Food],
  operationId: 'scanBarcode',
  validators: {
    body: object({
      barcode: number().openapi({description: 'Barcode to scan'}),
    }),
    response: foodValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.food.scanBarcode(ctx.viewer.id, ctx.params.body.barcode);
    if (!result) {
      throw new ApiError(ApiErrorCode.NotFound);
    }
    return result;
  },
});
