import {ZodFirstPartySchemaTypes, ZodObject, ZodRawShape, z} from 'zod';
import {OpenApiRequestContext} from '../OpenApiRequestContext';

export type PublicGetRoute<
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<ZodRawShape> | undefined,
  QueryValidator extends ZodObject<ZodRawShape> | undefined
> = {
  method: 'GET'
  description: string
  path: string
  validators: {
    query?: QueryValidator
    path?: PathValidator
    response: ResponseValidator
  }
  handler: (
    context: OpenApiRequestContext<PathValidator, QueryValidator, undefined, undefined>,
  ) => Promise<z.infer<ResponseValidator>>
}
