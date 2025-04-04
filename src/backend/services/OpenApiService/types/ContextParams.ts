import {RouteContextMap} from './RouteContextMap';
import {OpenApiRoute} from './OpenApiRoute';

export type ContextParams<TRouteType extends string, TContext extends RouteContextMap<TRouteType>> = {
  route: OpenApiRoute<TRouteType, TContext>
  request: Request,
  params: {
    body: unknown
    query: unknown
    path: unknown
  }
}
