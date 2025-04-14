import {OpenApiService} from '../../OpenApiService';
import {RouteContextMap} from '../../types/RouteContextMap';
import {RouteExtraPropsMap} from '../../types/RouteExtraPropsMap';
import {TanStackApiRoute} from './types/TanStackAPIRoute';
import {TanstackStartRoutingFunc} from './types/TanstackStartRoutingFunc';

export class OpenApiTanstackStartWrapper<
  TRouteTypes extends string,
  TContextMap extends RouteContextMap<TRouteTypes> = RouteContextMap<TRouteTypes>,
  TPropsMap extends RouteExtraPropsMap<TRouteTypes> = RouteExtraPropsMap<TRouteTypes>,
> {
  protected service: OpenApiService<TRouteTypes, TContextMap, TPropsMap>;

  constructor(openApi: OpenApiService<TRouteTypes, TContextMap, TPropsMap>) {
    this.service = openApi;
  }

  createOpenApiRootRoute<T extends string>(path: T, router: TanstackStartRoutingFunc<T>): TanStackApiRoute<T> {
    const processor = async (ctx: {request: Request}) => {
      const response = await this.service.processRootRoute(path, ctx.request);
      const res = new Response(JSON.stringify(response.body), {
        status: response.status ?? 200,
      });
      return res;
    };

    return router(path)({
      GET: processor,
      POST: processor,
      PATCH: processor,
      PUT: processor,
      DELETE: processor,
    });
  }
}
