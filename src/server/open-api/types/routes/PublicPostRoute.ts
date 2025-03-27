import {ZodFirstPartySchemaTypes, ZodObject, ZodRawShape, z} from 'zod';
import {OpenApiRequestContext} from '../OpenApiRequestContext';

export type PublicPostRoute<
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<ZodRawShape> | undefined,
  QueryValidator extends ZodObject<ZodRawShape> | undefined,
  BodyValidator extends ZodObject<ZodRawShape> | undefined = undefined
> = {
  method: 'POST'
  description: string
  path: string
  validators: {
    query?: QueryValidator
    path?: PathValidator
    body?: BodyValidator
    response: ResponseValidator
  }
  handler: (
    context: OpenApiRequestContext<PathValidator, QueryValidator, BodyValidator, undefined>,
  ) => Promise<z.infer<ResponseValidator>>
}
