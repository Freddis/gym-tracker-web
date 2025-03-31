import {ZodFirstPartySchemaTypes} from 'zod';
import {BaseOpenApiRoute} from './BaseOpenApiRoute';

export interface OpenApiRouteMapRow {
  path: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  routes: BaseOpenApiRoute<any, any, ZodFirstPartySchemaTypes, any, any, any>[],
}
