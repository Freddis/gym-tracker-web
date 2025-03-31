import {ZodFirstPartySchemaTypes, ZodObject, ZodRawShape} from 'zod';
import {OpenApiMethods} from './enums/OpenApiMethods';
import {RouteContextMap} from './types/RouteContextMap';
import {RouteExtraPropsMap} from './types/RouteExtraPropsMap';
import {BaseOpenApiRoute} from './types/BaseOpenApiRoute';
import {RouteContextCreatorMap} from './types/RouteContextCreatorMap';

export class OpenApiRoutingFactory<
TRouteTypes extends string,
TContextMap extends RouteContextMap<TRouteTypes> = RouteContextMap<TRouteTypes>,
TPropsMap extends RouteExtraPropsMap<TRouteTypes> = RouteExtraPropsMap<TRouteTypes>,
> {

  protected map: RouteContextCreatorMap<TRouteTypes, TContextMap>;

  constructor(map: RouteContextCreatorMap<TRouteTypes, TContextMap>) {
    this.map = map;
  }

  createRoute<
      TRouteType extends TRouteTypes,
      TMethod extends OpenApiMethods,
      TResponseValidator extends ZodFirstPartySchemaTypes,
      TQueryValidator extends ZodObject<ZodRawShape> | undefined = undefined,
      TPathValidator extends ZodObject<ZodRawShape> | undefined = undefined,
      TBodyValidator extends ZodObject<ZodRawShape> | undefined = undefined,
    >(
      params: BaseOpenApiRoute<
        TRouteType,
        TContextMap,
        TResponseValidator,
        TPathValidator,
        TQueryValidator,
        TBodyValidator,
        TMethod
      > & TPropsMap[TRouteType]
    ): BaseOpenApiRoute<
        TRouteType,
        TContextMap,
        TResponseValidator,
        TPathValidator,
        TQueryValidator,
        TBodyValidator
      > {

    const result : BaseOpenApiRoute<
      TRouteType,
      TContextMap,
      TResponseValidator,
      TPathValidator,
      TQueryValidator,
      TBodyValidator,
      TMethod
    > = {
      method: params.method,
      type: params.type,
      path: params.path,
      description: params.description,
      validators: {
        query: params.validators.query,
        path: params.validators.path,
        response: params.validators.response,
        body: params.validators.body,
      },
      handler: params.handler,
    };
    return result;
  }
}
