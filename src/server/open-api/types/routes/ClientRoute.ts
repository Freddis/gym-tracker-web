import {ZodFirstPartySchemaTypes, ZodObject, ZodRawShape} from 'zod';
import {ClientDeleteRoute} from './ClientDeleteRoute';
import {ClientGetRoute} from './ClientGetRoute';
import {ClientPatchRoute} from './ClientPatchRoute';
import {ClientPostRoute} from './ClientPostRoute';
import {ClientPutRoute} from './ClientPutRoute';

export type ClientRoute<
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<ZodRawShape> | undefined = undefined,
  QueryValidator extends ZodObject<ZodRawShape> | undefined = undefined,
  BodyValidator extends ZodObject<ZodRawShape> | undefined = undefined
> =
  | ClientGetRoute<ResponseValidator, PathValidator, QueryValidator>
  | ClientPostRoute<ResponseValidator, PathValidator, QueryValidator, BodyValidator>
  | ClientPatchRoute<ResponseValidator, PathValidator, QueryValidator, BodyValidator>
  | ClientPutRoute<ResponseValidator, PathValidator, QueryValidator, BodyValidator>
  | ClientDeleteRoute<ResponseValidator, PathValidator, QueryValidator, BodyValidator>
  | ClientDeleteRoute<ResponseValidator, PathValidator, QueryValidator>
