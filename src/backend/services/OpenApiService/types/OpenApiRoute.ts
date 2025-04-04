import {ZodObject, ZodRawShape, ZodFirstPartySchemaTypes} from 'zod';
import {BaseOpenApiRoute} from './BaseOpenApiRoute';
import {RouteContextMap} from './RouteContextMap';

export type OpenApiRoute<TRouteType extends string, TContext extends RouteContextMap<TRouteType>> =
BaseOpenApiRoute<
    TRouteType,
    TContext,
    ZodFirstPartySchemaTypes,
    ZodObject<ZodRawShape> | undefined,
    ZodObject<ZodRawShape> | undefined,
    ZodObject<ZodRawShape> | undefined
>
