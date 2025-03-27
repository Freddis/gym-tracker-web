import {ZodObject, ZodRawShape, ZodFirstPartySchemaTypes} from 'zod';
import {BaseOpenApiGetRoute} from './BaseOpenApiGetRoute';
import {BaseOpenApiPostRoute} from './BaseOpenApiPostRoute';
import {BaseOpenApiPatchRoute} from './BaseOpenApiPatchRoute';
import {BaseOpenApiPutRoute} from './BaseOpenApiPutRoute';
import {BaseOpenApiDeleteRoute} from './BaseOpenApiDeleteRoute';

export type OpenApiRoute<TViewer = unknown> =
  | BaseOpenApiGetRoute<
      ZodObject<ZodRawShape>,
      ZodFirstPartySchemaTypes,
      ZodObject<ZodRawShape>,
      TViewer
    >
  | BaseOpenApiPostRoute<
      ZodObject<ZodRawShape>,
      ZodFirstPartySchemaTypes,
      ZodObject<ZodRawShape>,
      ZodObject<ZodRawShape> | undefined,
      TViewer
    >
  | BaseOpenApiPatchRoute<
      ZodObject<ZodRawShape>,
      ZodFirstPartySchemaTypes,
      ZodObject<ZodRawShape>,
      ZodObject<ZodRawShape> | undefined,
      TViewer
    >
  | BaseOpenApiPutRoute<
      ZodObject<ZodRawShape>,
      ZodFirstPartySchemaTypes,
      ZodObject<ZodRawShape>,
      ZodObject<ZodRawShape> | undefined,
      TViewer
    >
  | BaseOpenApiDeleteRoute<
      ZodObject<ZodRawShape>,
      ZodFirstPartySchemaTypes,
      ZodObject<ZodRawShape>,
      ZodObject<ZodRawShape> | undefined,
      TViewer
    >
