import {ZodObject, ZodRawShape, ZodFirstPartySchemaTypes, z} from 'zod';
import {OpenApiRequestContext} from '../OpenApiRequestContext';
import {BaseOpenApiRoute} from './BaseOpenApiRoute';

export interface BaseOpenApiDeleteRoute<
  QueryValidator extends ZodObject<ZodRawShape>,
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<ZodRawShape>,
  BodyValidator extends ZodObject<ZodRawShape> | undefined,
  TViewer = unknown
> extends BaseOpenApiRoute<QueryValidator, ResponseValidator, PathValidator> {
  method: 'DELETE'
  queryValidator: QueryValidator
  pathValidator: PathValidator
  responseValidator: ResponseValidator
  bodyValidator: BodyValidator
  handler: (
    context: OpenApiRequestContext<PathValidator, QueryValidator, BodyValidator, TViewer>,
  ) => Promise<z.infer<ResponseValidator>>
}
