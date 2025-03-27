import {ZodFirstPartySchemaTypes, ZodObject, ZodRawShape, z} from 'zod';
import {Client} from '../Client';
import {OpenApiRequestContext} from '../OpenApiRequestContext';

export type ClientDeleteRoute<
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<ZodRawShape> | undefined,
  QueryValidator extends ZodObject<ZodRawShape> | undefined,
  BodyValidator extends ZodObject<ZodRawShape> | undefined = undefined
> = {
  method: 'DELETE'
  description: string
  path: string
  validators: {
    query?: QueryValidator
    path?: PathValidator
    body?: BodyValidator
    response: ResponseValidator
  }
  handler: (
    context: OpenApiRequestContext<PathValidator, QueryValidator, BodyValidator, Client>,
  ) => Promise<z.infer<ResponseValidator>>
}
