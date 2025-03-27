import {ZodFirstPartySchemaTypes, ZodObject, ZodRawShape} from 'zod';
import {UserDeleteRoute} from './UserDeleteRoute';
import {UserGetRoute} from './UserGetRoute';
import {UserPatchRoute} from './UserPatchRoute';
import {UserPostRoute} from './UserPostRoute';
import {UserPutRoute} from './UserPutRoute';

export type UserRoute<
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<ZodRawShape> | undefined = undefined,
  QueryValidator extends ZodObject<ZodRawShape> | undefined = undefined,
  BodyValidator extends ZodObject<ZodRawShape> | undefined = undefined
> =
  | UserGetRoute<ResponseValidator, PathValidator, QueryValidator>
  | UserPostRoute<ResponseValidator, PathValidator, QueryValidator, BodyValidator>
  | UserPatchRoute<ResponseValidator, PathValidator, QueryValidator, BodyValidator>
  | UserPutRoute<ResponseValidator, PathValidator, QueryValidator, BodyValidator>
  | UserDeleteRoute<ResponseValidator, PathValidator, QueryValidator, BodyValidator>
