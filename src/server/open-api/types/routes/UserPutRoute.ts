import {ZodFirstPartySchemaTypes, ZodObject, ZodRawShape, z} from 'zod';
import {Admin} from '../Admin';
import {NonEmptyArray} from '../NonEmptyArray';
import {OpenApiRequestContext} from '../OpenApiRequestContext';
import {Permission} from '../Permission';

export type UserPutRoute<
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<ZodRawShape> | undefined = undefined,
  QueryValidator extends ZodObject<ZodRawShape> | undefined = undefined,
  BodyValidator extends ZodObject<ZodRawShape> | undefined = undefined
> = {
  method: 'PUT'
  description: string
  path: string
  permissions: NonEmptyArray<Permission>
  validators: {
    query?: QueryValidator
    path?: PathValidator
    body?: BodyValidator
    response: ResponseValidator
  }
  handler: (
    context: OpenApiRequestContext<PathValidator, QueryValidator, BodyValidator, Admin>,
  ) => Promise<z.infer<ResponseValidator>>
}
