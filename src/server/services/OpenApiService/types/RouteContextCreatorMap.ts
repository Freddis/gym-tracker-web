import {RouteContextMap} from './RouteContextMap';
import {ContextParams} from './ContextParams';

export type RouteContextCreatorMap<TRouteType extends string, TContext extends RouteContextMap<TRouteType>> = {
  [key in TRouteType]: (params: ContextParams<key, TContext>) => Promise<TContext[key]>
}
