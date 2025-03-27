import {ZodFirstPartySchemaTypes, ZodObject, ZodRawShape, z} from 'zod';
import {Admin} from '../Admin';
import {NonEmptyArray} from '../NonEmptyArray';
import {OpenApiRequestContext} from '../OpenApiRequestContext';
import {Permission} from '../Permission';

export type UserGetRoute<
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<ZodRawShape> | undefined,
  QueryValidator extends ZodObject<ZodRawShape> | undefined
> = {
  method: 'GET'
  description: string
  path: string
  permissions: NonEmptyArray<Permission>
  validators: {
    query?: QueryValidator
    path?: PathValidator
    response: ResponseValidator
  }
  handler: (
    context: OpenApiRequestContext<PathValidator, QueryValidator, undefined, Admin>,
  ) => Promise<z.infer<ResponseValidator>>
}
