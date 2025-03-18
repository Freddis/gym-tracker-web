/* eslint-disable @typescript-eslint/no-explicit-any */
import {z, ZodType, ZodError, ZodObject, ZodRawShape, ZodFirstPartySchemaTypes} from 'zod';
import {EntryService} from '../services/EntryService/EntryService';
export type NonEmptyArray<T> = [T, ...T[]];
export interface Client {
  id: number;
  type: 'client'
}
export interface Admin {
  id: number;
  tyoe: 'admin'
}
export enum PermissionKey {
  dsadsa = 'dasd'
}

export interface BaseOpenApiRoute<
  X extends ZodObject<any>,
  T extends ZodFirstPartySchemaTypes,
  Z extends ZodObject<any>
> {
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
  type: 'User' | 'Client' | 'Unauthorized'
  path: string
  description: string
  queryValidator: X
  pathValidator: Z
  responseValidator: T
  permissions: PermissionKey[]
}

export type OptionalZodParams<T extends ZodType | undefined> = T extends ZodType ? z.infer<T> : never

export interface BaseOpenApiGetRoute<
  QueryValidator extends ZodObject<any>,
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<any>
> extends BaseOpenApiRoute<ZodObject<any>, ZodFirstPartySchemaTypes, ZodObject<any>> {
  method: 'GET'
  queryValidator: QueryValidator
  pathValidator: PathValidator
  responseValidator: ResponseValidator
  handler: (
    context: OpenApiRequestContext<PathValidator, QueryValidator, undefined, Admin | Client | undefined>,
  ) => Promise<z.infer<ResponseValidator>>
}
export interface RequestServices {
  models: {
    entry: EntryService
  }
}

export interface BaseOpenApiPostRoute<
  QueryValidator extends ZodObject<ZodRawShape>,
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<ZodRawShape>,
  BodyValidator extends ZodObject<ZodRawShape> | undefined
> extends BaseOpenApiRoute<QueryValidator, ResponseValidator, PathValidator> {
  method: 'POST'
  queryValidator: QueryValidator
  pathValidator: PathValidator
  responseValidator: ResponseValidator
  bodyValidator: BodyValidator
  handler: (
    context: OpenApiRequestContext<PathValidator, QueryValidator, BodyValidator, Admin | Client | undefined>,
  ) => Promise<z.infer<ResponseValidator>>
}

interface BaseOpenApiPatchRoute<
  QueryValidator extends ZodObject<ZodRawShape>,
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<ZodRawShape>,
  BodyValidator extends ZodObject<ZodRawShape> | undefined
> extends BaseOpenApiRoute<QueryValidator, ResponseValidator, PathValidator> {
  method: 'PATCH'
  queryValidator: QueryValidator
  pathValidator: PathValidator
  responseValidator: ResponseValidator
  bodyValidator: BodyValidator
  handler: (
    context: OpenApiRequestContext<PathValidator, QueryValidator, BodyValidator, Admin | Client | undefined>,
  ) => Promise<z.infer<ResponseValidator>>
}

interface BaseOpenApiPutRoute<
  QueryValidator extends ZodObject<ZodRawShape>,
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<ZodRawShape>,
  BodyValidator extends ZodObject<ZodRawShape> | undefined
> extends BaseOpenApiRoute<QueryValidator, ResponseValidator, PathValidator> {
  method: 'PUT'
  queryValidator: QueryValidator
  pathValidator: PathValidator
  responseValidator: ResponseValidator
  bodyValidator: BodyValidator
  handler: (
    context: OpenApiRequestContext<PathValidator, QueryValidator, BodyValidator, Admin | Client | undefined>,
  ) => Promise<z.infer<ResponseValidator>>
}

interface BaseOpenApiDeleteRoute<
  QueryValidator extends ZodObject<ZodRawShape>,
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<ZodRawShape>,
  BodyValidator extends ZodObject<ZodRawShape> | undefined
> extends BaseOpenApiRoute<QueryValidator, ResponseValidator, PathValidator> {
  method: 'DELETE'
  queryValidator: QueryValidator
  pathValidator: PathValidator
  responseValidator: ResponseValidator
  bodyValidator: BodyValidator
  handler: (
    context: OpenApiRequestContext<PathValidator, QueryValidator, BodyValidator, Admin | Client | undefined>,
  ) => Promise<z.infer<ResponseValidator>>
}

export type OpenApiGetRoute = BaseOpenApiGetRoute<
  ZodObject<ZodRawShape>,
  ZodFirstPartySchemaTypes,
  ZodObject<ZodRawShape>
>

export type OpenApiPostRoute = BaseOpenApiPostRoute<
  ZodObject<ZodRawShape>,
  ZodFirstPartySchemaTypes,
  ZodObject<ZodRawShape>,
  ZodObject<ZodRawShape> | undefined
>

export type OpenApiPatchRoute = BaseOpenApiPatchRoute<
  ZodObject<ZodRawShape>,
  ZodFirstPartySchemaTypes,
  ZodObject<ZodRawShape>,
  ZodObject<ZodRawShape> | undefined
>

export type OpenApiPutRoute = BaseOpenApiPutRoute<
  ZodObject<ZodRawShape>,
  ZodFirstPartySchemaTypes,
  ZodObject<ZodRawShape>,
  ZodObject<ZodRawShape> | undefined
>

export type OpenApiDeleteRoute = BaseOpenApiDeleteRoute<
  ZodObject<ZodRawShape>,
  ZodFirstPartySchemaTypes,
  ZodObject<ZodRawShape>,
  ZodObject<ZodRawShape> | undefined
>

export type OpenApiRoute =
  | OpenApiGetRoute
  | OpenApiPostRoute
  | OpenApiPatchRoute
  | OpenApiPutRoute
  | OpenApiDeleteRoute

export interface OpenApiBaseErrorResponse {
  code: OpenApiErrorCode
}

export interface OpenApiActionErrorResponse extends OpenApiBaseErrorResponse {
  code: OpenApiErrorCode.actionError
  actionErrorCode: OpenApiActionErrorCode
  humanReadable: string
}

export enum ValidationLocations {
  query = 'query',
  path = 'path',
  body = 'body',
  response = 'response',
}

export interface OpenApiValidationErrorResponse extends OpenApiBaseErrorResponse {
  code: OpenApiErrorCode.validationFailed
  fieldErrors?: OpenApiFieldError[]
  responseValidationErrors?: OpenApiFieldError[]
}

export interface OpenApiUnknownMethodResponse extends OpenApiBaseErrorResponse {
  code: OpenApiErrorCode.unknownMethodError
  humanReadable?: string
}

export interface OpenApiPermissionErrorResponse extends OpenApiBaseErrorResponse {
  code: OpenApiErrorCode.missingPermission
  requiredPermissions: PermissionKey[]
}

export type OpenApiErrorResponse =
  | OpenApiActionErrorResponse
  | OpenApiValidationErrorResponse
  | OpenApiPermissionErrorResponse
  | OpenApiUnknownMethodResponse
  | OpenApiBaseErrorResponse

export interface OpenApiFieldError {
  field: string
  message: string
  fieldErrors?: OpenApiFieldError[]
}

export enum OpenApiErrorCode {
  unknownError = 'unknownError',
  unknownMethodError = 'unknownMethodError',
  validationFailed = 'validationFailed',
  userNotFound = 'userNotFound',
  unauthorized = 'unauthorized',
  missingPermission = 'missingPermission',
  actionError = 'actionError',
  notFound = 'notFound',
}

export enum OpenApiActionErrorCode {
  cannotCreateDeposit = 'cannotCreateDeposit',
  invalidPassword = 'invalidPassword',
  invalidTotpCode = 'invalidTotpCode',
  totpNotEnabled = 'totpNotEnabled',
  totpAlreadyEnabled = 'totpAlreadyEnabled',
}

type ActionErrorDescriptions = {
  [key in OpenApiActionErrorCode]: string
}

const actionErrorDescriptions: ActionErrorDescriptions = {
  [OpenApiActionErrorCode.cannotCreateDeposit]: 'Cannot create a deposit',
  [OpenApiActionErrorCode.invalidPassword]: 'Invalid password',
  [OpenApiActionErrorCode.invalidTotpCode]: 'Invalid two-factor authentication (2FA) code',
  [OpenApiActionErrorCode.totpNotEnabled]: 'Two-factor authentication (2FA) is not enabled for this account',
  [OpenApiActionErrorCode.totpAlreadyEnabled]:
    'Two-factor authentication (2FA) is already enabled for this account',
};

export enum OpenApiMethods {
  get = 'GET',
  post = 'POST',
  patch = 'PATCH',
  put = 'PUT',
  delete = 'DELETE',
}

export class OpenApiError extends Error {
  private code: OpenApiErrorCode;
  constructor(code: OpenApiErrorCode) {
    super(code);
    this.code = code;
  }
  getOpenApiCode() {
    return this.code;
  }
}

export class OpenApiActionError extends OpenApiError {
  private clientFriendlyMessage: string;
  private actionErrorCode: OpenApiActionErrorCode;

  constructor(actionErrorCode: OpenApiActionErrorCode) {
    super(OpenApiErrorCode.actionError);
    this.clientFriendlyMessage = actionErrorDescriptions[actionErrorCode];
    this.actionErrorCode = actionErrorCode;
  }

  getOpenApiCode(): OpenApiErrorCode.actionError {
    return OpenApiErrorCode.actionError;
  }
  getActionErrorCode() {
    return this.actionErrorCode;
  }

  getClientFriendlyMessage(): string {
    return this.clientFriendlyMessage;
  }
}

export class OpenApiPermissionError extends OpenApiError {
  private requiredPermissions: NonEmptyArray<PermissionKey>;
  constructor(requiredPermissions: NonEmptyArray<PermissionKey>) {
    super(OpenApiErrorCode.unauthorized);
    this.requiredPermissions = requiredPermissions;
  }

  getRequiredPermissions(): PermissionKey[] {
    return this.requiredPermissions;
  }
}

export class OpenApiValidationError extends OpenApiError {
  private error: ZodError<any>;
  private location: ValidationLocations;

  constructor(error: ZodError<any>, location: ValidationLocations) {
    super(OpenApiErrorCode.validationFailed);
    this.error = error;
    this.location = location;
  }

  getZodError() {
    return this.error;
  }

  getLocation() {
    return this.location;
  }
}

export interface OpenApiRequestContext<
  PathValidator extends ZodObject<any> | undefined,
  QueryValidator extends ZodObject<any> | undefined,
  BodyValidator extends ZodObject<any> | undefined,
  TViewer extends Client | Admin | undefined
> {
  params: {
    body: BodyValidator extends ZodObject<any> ? z.infer<BodyValidator> : never
    query: OptionalZodParams<QueryValidator>
    path: OptionalZodParams<PathValidator>
  }
  viewer: TViewer extends Client | Admin ? TViewer : never
  permission: TViewer extends Admin ? PermissionKey : never
  // req: Request
  // res: Response
  services: RequestServices
}

export type PublicRoute<
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<any> | undefined = undefined,
  QueryValidator extends ZodObject<any> | undefined = undefined,
  BodyValidator extends ZodObject<any> | undefined = undefined
> =
  | PublicGetRoute<ResponseValidator, PathValidator, QueryValidator>
  | PublicPostRoute<ResponseValidator, PathValidator, QueryValidator, BodyValidator>
  | PublicPatchRoute<ResponseValidator, PathValidator, QueryValidator, BodyValidator>
  | PublicPutRoute<ResponseValidator, PathValidator, QueryValidator, BodyValidator>
  | PublicDeleteRoute<ResponseValidator, PathValidator, QueryValidator, BodyValidator>

export type PublicGetRoute<
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<any> | undefined,
  QueryValidator extends ZodObject<any> | undefined
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

export type PublicPostRoute<
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<any> | undefined,
  QueryValidator extends ZodObject<any> | undefined,
  BodyValidator extends ZodObject<any> | undefined = undefined
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

export type PublicPatchRoute<
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<any> | undefined,
  QueryValidator extends ZodObject<any> | undefined,
  BodyValidator extends ZodObject<any> | undefined = undefined
> = {
  method: 'PATCH'
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

export type PublicPutRoute<
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<any> | undefined,
  QueryValidator extends ZodObject<any> | undefined,
  BodyValidator extends ZodObject<any> | undefined = undefined
> = {
  method: 'PUT'
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

export type PublicDeleteRoute<
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<any> | undefined,
  QueryValidator extends ZodObject<any> | undefined,
  BodyValidator extends ZodObject<any> | undefined = undefined
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
    context: OpenApiRequestContext<PathValidator, QueryValidator, BodyValidator, undefined>,
  ) => Promise<z.infer<ResponseValidator>>
}

export type ClientRoute<
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<any> | undefined = undefined,
  QueryValidator extends ZodObject<any> | undefined = undefined,
  BodyValidator extends ZodObject<any> | undefined = undefined
> =
  | ClientGetRoute<ResponseValidator, PathValidator, QueryValidator>
  | ClientPostRoute<ResponseValidator, PathValidator, QueryValidator, BodyValidator>
  | ClientPatchRoute<ResponseValidator, PathValidator, QueryValidator, BodyValidator>
  | ClientPutRoute<ResponseValidator, PathValidator, QueryValidator, BodyValidator>
  | ClientDeleteRoute<ResponseValidator, PathValidator, QueryValidator, BodyValidator>
  | ClientDeleteRoute<ResponseValidator, PathValidator, QueryValidator>

export type ClientPostRoute<
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<any> | undefined,
  QueryValidator extends ZodObject<any> | undefined,
  BodyValidator extends ZodObject<any> | undefined = undefined
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
    context: OpenApiRequestContext<PathValidator, QueryValidator, BodyValidator, Client>,
  ) => Promise<z.infer<ResponseValidator>>
}

export type ClientPatchRoute<
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<any> | undefined,
  QueryValidator extends ZodObject<any> | undefined,
  BodyValidator extends ZodObject<any> | undefined = undefined
> = {
  method: 'PATCH'
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

export type ClientPutRoute<
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<any> | undefined,
  QueryValidator extends ZodObject<any> | undefined,
  BodyValidator extends ZodObject<any> | undefined = undefined
> = {
  method: 'PUT'
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

export type ClientDeleteRoute<
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<any> | undefined,
  QueryValidator extends ZodObject<any> | undefined,
  BodyValidator extends ZodObject<any> | undefined = undefined
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

export type ClientGetRoute<
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<any> | undefined,
  QueryValidator extends ZodObject<any> | undefined
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
    context: OpenApiRequestContext<PathValidator, QueryValidator, undefined, Client>,
  ) => Promise<z.infer<ResponseValidator>>
}

export type UserRoute<
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<any> | undefined = undefined,
  QueryValidator extends ZodObject<any> | undefined = undefined,
  BodyValidator extends ZodObject<any> | undefined = undefined
> =
  | UserGetRoute<ResponseValidator, PathValidator, QueryValidator>
  | UserPostRoute<ResponseValidator, PathValidator, QueryValidator, BodyValidator>
  | UserPatchRoute<ResponseValidator, PathValidator, QueryValidator, BodyValidator>
  | UserPutRoute<ResponseValidator, PathValidator, QueryValidator, BodyValidator>
  | UserDeleteRoute<ResponseValidator, PathValidator, QueryValidator, BodyValidator>

export type UserGetRoute<
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<any> | undefined,
  QueryValidator extends ZodObject<any> | undefined
> = {
  method: 'GET'
  description: string
  path: string
  permissions: NonEmptyArray<PermissionKey>
  validators: {
    query?: QueryValidator
    path?: PathValidator
    response: ResponseValidator
  }
  handler: (
    context: OpenApiRequestContext<PathValidator, QueryValidator, undefined, Admin>,
  ) => Promise<z.infer<ResponseValidator>>
}

export type UserPostRoute<
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<any> | undefined = undefined,
  QueryValidator extends ZodObject<any> | undefined = undefined,
  BodyValidator extends ZodObject<any> | undefined = undefined
> = {
  method: 'POST'
  description: string
  path: string
  permissions: NonEmptyArray<PermissionKey>
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

export type UserPatchRoute<
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<any> | undefined = undefined,
  QueryValidator extends ZodObject<any> | undefined = undefined,
  BodyValidator extends ZodObject<any> | undefined = undefined
> = {
  method: 'PATCH'
  description: string
  path: string
  permissions: NonEmptyArray<PermissionKey>
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

export type UserPutRoute<
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<any> | undefined = undefined,
  QueryValidator extends ZodObject<any> | undefined = undefined,
  BodyValidator extends ZodObject<any> | undefined = undefined
> = {
  method: 'PUT'
  description: string
  path: string
  permissions: NonEmptyArray<PermissionKey>
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

export type UserDeleteRoute<
  ResponseValidator extends ZodFirstPartySchemaTypes,
  PathValidator extends ZodObject<any> | undefined = undefined,
  QueryValidator extends ZodObject<any> | undefined = undefined,
  BodyValidator extends ZodObject<any> | undefined = undefined
> = {
  method: 'DELETE'
  description: string
  path: string
  permissions: NonEmptyArray<PermissionKey>
  validators: {
    query?: QueryValidator
    path?: PathValidator
    body?: BodyValidator
    response: ResponseValidator
  }
  handler: (
    context: OpenApiRequestContext<PathValidator, QueryValidator, undefined, Admin>,
  ) => Promise<z.infer<ResponseValidator>>
}
