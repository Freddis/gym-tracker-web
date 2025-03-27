import {ZodObject, ZodFirstPartySchemaTypes, z, ZodRawShape} from 'zod';
import {BaseOpenApiRoute} from './BaseOpenApiRoute';
import {OpenApiRequestContext} from '../OpenApiRequestContext';

export interface BaseOpenApiGetRoute<
  QueryValidator extends ZodObject<ZodRawShape>,
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<ZodRawShape>,
  TViewer = unknown,
> extends BaseOpenApiRoute<ZodObject<ZodRawShape>, ZodFirstPartySchemaTypes, ZodObject<ZodRawShape>> {
  method: 'GET'
  queryValidator: QueryValidator
  pathValidator: PathValidator
  responseValidator: ResponseValidator
  handler: (
    context: OpenApiRequestContext<PathValidator, QueryValidator, undefined, TViewer>,
  ) => Promise<z.infer<ResponseValidator>>
}

