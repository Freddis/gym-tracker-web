import {ZodFirstPartySchemaTypes, ZodObject, ZodRawShape} from 'zod';
import {PublicDeleteRoute} from './PublicDeleteRoute';
import {PublicGetRoute} from './PublicGetRoute';
import {PublicPatchRoute} from './PublicPatchRoute';
import {PublicPostRoute} from './PublicPostRoute';
import {PublicPutRoute} from './PublicPutRoute';

export type PublicRoute<
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<ZodRawShape> | undefined = undefined,
  QueryValidator extends ZodObject<ZodRawShape> | undefined = undefined,
  BodyValidator extends ZodObject<ZodRawShape> | undefined = undefined
> =
  | PublicGetRoute<ResponseValidator, PathValidator, QueryValidator>
  | PublicPostRoute<ResponseValidator, PathValidator, QueryValidator, BodyValidator>
  | PublicPatchRoute<ResponseValidator, PathValidator, QueryValidator, BodyValidator>
  | PublicPutRoute<ResponseValidator, PathValidator, QueryValidator, BodyValidator>
  | PublicDeleteRoute<ResponseValidator, PathValidator, QueryValidator, BodyValidator>
