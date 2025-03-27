import 'zod-openapi/extend';
import fs from 'fs';
import {stringify} from 'yaml';
import {
  z,
  ZodArray,
  ZodDefault,
  ZodFirstPartySchemaTypes,
  ZodObject,
  ZodOptional,
  ZodRawShape,
  ZodString,
  ZodTypeAny,
  ZodUnion,
  ZodUnionOptions,
} from 'zod';
import {
  createDocument,
  ZodOpenApiObject,
  ZodOpenApiOperationObject,
  ZodOpenApiParameters,
  ZodOpenApiPathsObject,
} from 'zod-openapi';
import {openApiActionErrorResponseValidator} from './validators/errors/OpenApiActionErrorResponseValidator';
import {
  OpenApiFieldError,
  openApiValidationErrorResponseValidator,
} from './validators/errors/OpenApiValidationErrorResponseValidator';
import {Logger} from '../../utls/Logger/Logger';
import {EntryService} from '../services/EntryService/EntryService';
import {DrizzleService} from '../services/DrizzleService/DrizzleService';
import {OpenApiErrorCode} from './enums/OpenApiErrorCode';
import {OpenApiMethods} from './enums/OpenApiMethods';
import {ValidationLocations} from './enums/ValidationLocations';
import {Admin} from './types/Admin';
import {OpenApiActionError} from './types/errors/OpenApiActionError';
import {OpenApiError} from './types/errors/OpenApiError';
import {OpenApiPermissionError} from './types/errors/OpenApiPermissionError';
import {OpenApiValidationError} from './types/errors/OpenApiValidationError';
import {OpenApiRequestContext} from './types/OpenApiRequestContext';
import {OpenApiErrorResponse} from './types/responses/OpenApiErrorResponse';
import {ClientRoute} from './types/routes/ClientRoute';
import {OpenApiRoute} from './types/routes/OpenApiRoute';
import {PublicRoute} from './types/routes/PublicRoute';
import {UserRoute} from './types/routes/UserRoute';
import {Permission} from './types/Permission';
import {Client} from './types/Client';
import {NonEmptyArray} from './types/NonEmptyArray';
import {RequestServices} from './types/RequestServices';

export class OpenApiService {
  protected routes: OpenApiRoute[] = [];
  protected logger: Logger;
  protected basePath = '';
  public readonly validators = {
    paginatedQuery: <X extends ZodRawShape>(filter: X) =>
      z
        .object({
          page: z.number().optional().openapi({description: 'Page number'}),
          pageSize: z.number().min(1).max(50).optional().default(10).openapi({
            description: 'Number of items to display in the page.',
          }),
        })
        .extend(filter)
        .openapi({description: 'Pagination parameters'}),
    paginatedResponse: <T extends ZodObject<ZodRawShape>| ZodUnion<ZodUnionOptions>>(arr: T) =>
      z.object({
        items: z.array(arr).openapi({description: 'Page or items'}),
        info: z
          .object({
            count: z.number().openapi({description: 'Total number of items'}),
            page: z.number().openapi({description: 'Current page'}),
            pageSize: z.number().openapi({description: 'Number of items per page'}),
          })
          .openapi({description: 'Pagination details'}),
      }),
    objects: {
    },
  };

  constructor() {
    this.logger = new Logger('OpenAPI');
  }

  createClientwRoute<
    ResponseValidator extends ZodFirstPartySchemaTypes,
    PathValidator extends ZodObject<ZodRawShape> | undefined = undefined,
    QueryValidator extends ZodObject<ZodRawShape> | undefined = undefined,
    BodyValidator extends ZodObject<ZodRawShape> | undefined = undefined
  >(params: ClientRoute<ResponseValidator, PathValidator, QueryValidator, BodyValidator>): OpenApiRoute<Client> {
    if (params.method === OpenApiMethods.get) {
      return {
        type: 'Client',
        permissions: [],
        method: params.method,
        description: params.description,
        queryValidator: params.validators.query ?? z.object({}),
        pathValidator: params.validators.path ?? z.object({}),
        responseValidator: params.validators.response,
        path: params.path,
        handler: params.handler,
      };
    }
    if (params.method === OpenApiMethods.patch || params.method === OpenApiMethods.put) {
      return {
        method: params.method,
        type: 'Client',
        permissions: [],
        description: params.description,
        queryValidator: params.validators.query ?? z.object({}),
        pathValidator: params.validators.path ?? z.object({}),
        responseValidator: params.validators.response,
        bodyValidator: params.validators.body ?? z.object({}),
        path: params.path,
        handler: params.handler,
      };
    }
    if (params.method === OpenApiMethods.delete) {
      return {
        method: 'DELETE',
        type: 'Client',
        permissions: [],
        description: params.description,
        queryValidator: params.validators.query ?? z.object({}),
        pathValidator: params.validators.path ?? z.object({}),
        responseValidator: params.validators.response,
        bodyValidator: params.validators.body ?? z.object({}),
        path: params.path,
        handler: params.handler,
      };
    }

    return {
      method: OpenApiMethods.post,
      type: 'Client',
      permissions: [],
      description: params.description,
      queryValidator: params.validators.query ?? z.object({}),
      pathValidator: params.validators.path ?? z.object({}),
      responseValidator: params.validators.response,
      bodyValidator: params.validators.body ?? z.object({}),
      path: params.path,
      handler: params.handler,
    };
  }

  createPublicRoute<
    ResponseValidator extends ZodFirstPartySchemaTypes,
    PathValidator extends ZodObject<ZodRawShape> | undefined = undefined,
    QueryValidator extends ZodObject<ZodRawShape> | undefined = undefined,
    BodyValidator extends ZodObject<ZodRawShape> | undefined = undefined
  >(
    params: PublicRoute<ResponseValidator, PathValidator, QueryValidator, BodyValidator>
  ): OpenApiRoute<undefined> {
    if (params.method === OpenApiMethods.get) {
      return {
        type: 'Unauthorized',
        method: params.method,
        permissions: [],
        description: params.description,
        queryValidator: params.validators.query ?? z.object({}),
        pathValidator: params.validators.path ?? z.object({}),
        responseValidator: params.validators.response,
        path: params.path,
        handler: params.handler,
      };
    }

    if (params.method === OpenApiMethods.patch || params.method === OpenApiMethods.put) {
      return {
        method: params.method,
        type: 'Unauthorized',
        permissions: [],
        description: params.description,
        queryValidator: params.validators.query ?? z.object({}),
        pathValidator: params.validators.path ?? z.object({}),
        responseValidator: params.validators.response,
        bodyValidator: params.validators.body ?? z.object({}),
        path: params.path,
        handler: params.handler,
      };
    }
    if (params.method === OpenApiMethods.delete) {
      return {
        method: 'DELETE',
        type: 'Client',
        permissions: [],
        description: params.description,
        queryValidator: params.validators.query ?? z.object({}),
        pathValidator: params.validators.path ?? z.object({}),
        responseValidator: params.validators.response,
        bodyValidator: params.validators.body ?? z.object({}),
        path: params.path,
        handler: params.handler,
      };
    }

    return {
      method: OpenApiMethods.post,
      type: 'Unauthorized',
      permissions: [],
      description: params.description,
      queryValidator: params.validators.query ?? z.object({}),
      pathValidator: params.validators.path ?? z.object({}),
      responseValidator: params.validators.response,
      bodyValidator: params.validators.body ?? z.object({}),
      path: params.path,
      handler: params.handler,
    };
  }

  createUserRoute<
    ResponseValidator extends ZodFirstPartySchemaTypes,
    PathValidator extends ZodObject<ZodRawShape> | undefined = undefined,
    QueryValidator extends ZodObject<ZodRawShape> | undefined = undefined,
    BodyValidator extends ZodObject<ZodRawShape> | undefined = undefined
  >(params: UserRoute<ResponseValidator, PathValidator, QueryValidator, BodyValidator>): OpenApiRoute<Admin> {
    if (params.method === OpenApiMethods.get) {
      const route: OpenApiRoute<Admin> = {
        type: 'User',
        method: params.method,
        description: params.description,
        permissions: params.permissions,
        queryValidator: params.validators.query ?? z.object({}),
        pathValidator: params.validators.path ?? z.object({}),
        responseValidator: params.validators.response,
        path: params.path,
        handler: params.handler,
      };
      return route;
    }
    if (params.method === OpenApiMethods.patch || params.method === OpenApiMethods.put) {
      const route: OpenApiRoute<Admin> = {
        method: params.method,
        type: 'User',
        permissions: [],
        description: params.description,
        queryValidator: params.validators.query ?? z.object({}),
        pathValidator: params.validators.path ?? z.object({}),
        responseValidator: params.validators.response,
        bodyValidator: params.validators.body ?? z.object({}),
        path: params.path,
        handler: params.handler,
      };

      return route;
    }
    if (params.method === OpenApiMethods.delete) {
      return {
        method: params.method,
        type: 'User',
        permissions: [],
        description: params.description,
        queryValidator: params.validators.query ?? z.object({}),
        pathValidator: params.validators.path ?? z.object({}),
        responseValidator: params.validators.response,
        bodyValidator: params.validators.body ?? z.object({}),
        path: params.path,
        handler: params.handler,
      };
    }
    const route: OpenApiRoute<Admin> = {
      method: OpenApiMethods.post,
      type: 'User',
      description: params.description,
      permissions: params.permissions,
      queryValidator: params.validators.query ?? z.object({}),
      pathValidator: params.validators.path ?? z.object({}),
      responseValidator: params.validators.response,
      bodyValidator: params.validators.body ?? z.object({}),
      path: params.path,
      handler: params.handler,
    };
    return route;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public addRoutes(path: string, routes: (OpenApiRoute<any>)[]) {
    const newRoutes = routes.map((x) => ({...x, path: path + x.path}));
    this.routes.push(...newRoutes);
  }

  protected checkRouteDescriptions(route: OpenApiRoute<unknown>) {
    const minimalLength = 10;
    if (!route.description || route.description.length < minimalLength) {
      throw new Error(`Description for ${route.path} is missing or too small`);
    }
    this.checkValidatorDescriptions(route, 'responseValidator', 'responseValidator', route.responseValidator);
    this.checkValidatorDescriptions(route, 'pathValidator', 'pathValidator', route.pathValidator, false);
    this.checkValidatorDescriptions(route, 'queryValidator', 'queryValidator', route.queryValidator, false);
    if (route.method === 'POST' && route.bodyValidator) {
      this.checkValidatorDescriptions(route, 'bodyValidator', 'bodyValidator', route.bodyValidator, false);
    }
  }

  protected checkValidatorDescriptions(
    route: OpenApiRoute,
    validatorName: string,
    field: string | undefined,
    validator: ZodTypeAny,
    checkValidatorDescription = true,
  ) {
    const openapi = validator._def.openapi;
    if (checkValidatorDescription && !openapi?.description) {
      throw new Error(
        `Route '${route.method}:${route.path}': ${validatorName} missing openapi description on field ${field}`,
      );
    }
    // console.log(validator._def.typeName)
    if (validator._def.typeName === 'ZodArray') {
      const arr = validator as ZodArray<ZodObject<ZodRawShape>>;
      const nonPrimitiveArray = arr.element.shape !== undefined;
      if (nonPrimitiveArray) {
        this.checkShapeDescription(route, validatorName, arr.element.shape);
      }
    }
    if (validator._def.typeName === 'ZodEffects') {
      const msg = `Route '${route.method}:${route.path}': ${validatorName} on field ${field}: usage of transformers is forbidden`;
      throw new Error(msg);
    }
    if (validator._def.typeName === 'ZodObject') {
      const obj = validator as ZodObject<ZodRawShape>;
      this.checkShapeDescription(route, validatorName, obj.shape);
    }
  }

  protected checkShapeDescription(route: OpenApiRoute, validatorName: string, shape: ZodRawShape) {
    for (const field of Object.keys(shape)) {
      const value = shape[field] as ZodObject<ZodRawShape>;
      this.checkValidatorDescriptions(route, validatorName, field, value);
    }
  }

  getRouteForPath(path: string): OpenApiRoute | null {
    for (const route of this.routes) {
      if (path.startsWith(route.path)) {
        return route;
      }
    }
    return null;
  }

  async processRootRoute(
    basePath: string,
    originalReq: Request
  ): Promise<{status: number; body: OpenApiErrorResponse}| {status: undefined}> {
    try {
      const url = new URL(originalReq.url);
      const urlPath = url.pathname.replace(basePath, '');
      const req = {
        path: urlPath,
        method: originalReq.method,
        params: {},
        query: Object.fromEntries(url.searchParams.entries()),
        body: originalReq.body,
      };
      const route = this.getRouteForPath(urlPath);
      if (!route) {
        throw new OpenApiError(OpenApiErrorCode.notFound);
      }
      // return {succsess: route};
      this.logger.info(`Calling route ${route.path}`);
      this.logger.info(`${req.method}: ${req.path}`, {
        params: req.params,
        query: req.query,
        body: req.body,
      });
      const query = this.convertStringsAndSafeParse(
        route.queryValidator.strict(),
        req.query,
        ValidationLocations.query,
      );
      if (!query.success) {
        throw new OpenApiValidationError(query.error, ValidationLocations.query);
      }
      const path = this.convertStringsAndSafeParse(
      route.pathValidator.strict(),
      req.params,
      ValidationLocations.path,
    );
      if (!path.success) {
        throw new OpenApiValidationError(path.error, ValidationLocations.path);
      }
      let response: unknown;
      const containsBody =
      route.method === 'POST' ||
      route.method === 'PATCH' ||
      route.method === 'PUT' ||
      route.method === 'DELETE';
      if (containsBody && route.bodyValidator) {
        const body = route.bodyValidator.safeParse(req.body);
        if (!body.success) {
          throw new OpenApiValidationError(body.error, ValidationLocations.body);
        }
        const context = await this.createContext(originalReq, route, path.data, query.data, body.data);
        response = await route.handler(context);
      } else {
        const context = await this.createContext(originalReq, route, path.data, query.data, undefined);
        response = await route.handler(context);
      }
      const validated = route.responseValidator.safeParse(response);
      if (!validated.success) {
        throw new OpenApiValidationError(validated.error, ValidationLocations.response);
      }
      this.logger.info('Response: 200', validated.data);
      return validated.data;
    } catch (e) {
      this.logger.error('Error during request openAPI route handling', e);
      const response = this.getErrorResponse(e);
      return response;
    }
  }

  protected async createContext(
    req: Request,
    route: OpenApiRoute,
    path: object,
    query: object,
    body?: object,
  ): Promise<
    OpenApiRequestContext<
      ZodObject<ZodRawShape>,
      ZodObject<ZodRawShape>,
      ZodObject<ZodRawShape>,
      Client | Admin | undefined
    >
  > {
    // let viewer: Client | Admin | undefined;
    // const authService = await authServiceFactory.get();
    let permission: Permission | undefined;
    const services: RequestServices = {
      models: {
        entry: new EntryService(new DrizzleService()),
      },
    };
    if (route.type === 'Client') {
      // viewer = (await authService.getClientFromRequest(req)) ?? undefined;
      const client: Client = {
        id: 2,
        type: 'client',
      };
      if (!client) {
        throw new OpenApiError(OpenApiErrorCode.unauthorized);
      }
      return {
        params: {
          path: path,
          query: query,
          body: body ?? {},
        },
        permission: permission as Permission | never,
        services: services,
        viewer: client,
      };
    }
    function isNonEmptyArray<T>(arr: T[]): arr is NonEmptyArray<T> {
      return arr.length > 0;
    }

    if (route.type === 'User') {
      // viewer = (await authService.getUserFromRequest(req)) ?? undefined;
      if (!isNonEmptyArray(route.permissions)) {
        throw new Error("User route doesn't have permissions specified");
      }
      const user: Admin = {
        id: 1,
        type: 'admin',
      };
      if (!user) {
        throw new OpenApiError(OpenApiErrorCode.unauthorized);
      }
        // const adminService = await adminServiceFactory.get();
        // const foundPermission = await adminService.hasAtLeastOnePermission(
        //   viewer,
        //   [...route.permissions].reverse(),
        // );
      const foundPermission: Permission | null = null;
      if (!foundPermission) {
        throw new OpenApiPermissionError(route.permissions);
      }
      permission = foundPermission;
      return {
        params: {
          path: path,
          query: query,
          body: body ?? {},
        },
        permission: permission,
        services: services,
        viewer: user,
      };
    }

    return {
      params: {
        path: path,
        query: query,
        body: body ?? {},
      },
      services: services,
      viewer: undefined as never,
      permission: undefined as never,
    };
  }

  protected getErrorResponse(e: unknown): {status: number; body: OpenApiErrorResponse} {
    if (e instanceof OpenApiError) {
      const code = e.getOpenApiCode();
      if (code === OpenApiErrorCode.notFound) {
        return {
          status: 404,
          body: {
            code,
          },
        };
      }
      if (code === OpenApiErrorCode.unauthorized) {
        return {
          status: 401,
          body: {
            code: code,
          },
        };
      }
      if (e instanceof OpenApiActionError) {
        return {
          status: 400,
          body: {
            code: e.getOpenApiCode(),
            actionErrorCode: e.getActionErrorCode(),
            humanReadable: e.getClientFriendlyMessage(),
          },
        };
      }
      if (e instanceof OpenApiPermissionError) {
        return {
          status: 403,
          body: {
            code: OpenApiErrorCode.missingPermission,
            requiredPermissions: e.getRequiredPermissions(),
          },
        };
      }
      const showResponseErrors = true;
      if (
        e instanceof OpenApiValidationError &&
        (e.getLocation() !== ValidationLocations.response || showResponseErrors)
      ) {
        const zodError = e.getZodError();
        const location = e.getLocation();
        const map: OpenApiFieldError[] = [];
        for (const issue of zodError.issues) {
          map.push({
            field: issue.path.map((x) => x.toString()).join('.'),
            message: issue.message,
          });
        }
        const bodyFields = {
          code: OpenApiErrorCode.validationFailed,
          location: e.getLocation(),
          fieldErrors: map,
        };

        return {
          status: location === ValidationLocations.response ? 422 : 400,
          body: bodyFields,
        };
      }
      return {
        status: 500,
        body: {
          code: code,
        },
      };
    }
    return {
      status: 500,
      body: {
        code: OpenApiErrorCode.unknownError,
      },
    };
  }

  protected convertStringsAndSafeParse(
    finalValidator: z.ZodObject<ZodRawShape>,
    data: unknown,
    paramSourceName: ValidationLocations,
  ): z.SafeParseReturnType<unknown, object> {
    const initialValidatorShape: {
      [key: string]:
        | ZodArray<ZodString>
        | ZodString
        | ZodOptional<ZodString | ZodArray<ZodString>>
        | ZodDefault<ZodString>
        | ZodUnion<ZodUnionOptions>
        | ZodOptional<ZodUnion<ZodUnionOptions>>
    } = {};
    const finalShape = (finalValidator as ZodObject<ZodRawShape>).shape;
    for (const key of Object.keys(finalShape)) {
      let def = finalShape[key]._def;
      if (def.typeName === 'ZodDefault') {
        def = def.innerType._def;
        // no continue, just unwrapping
      }

      if (def.typeName === 'ZodArray') {
        const validator = z.union([z.string().transform((x) => [x]), z.string().array()]);
        initialValidatorShape[key] = validator;
        continue;
      }
      initialValidatorShape[key] = z.string();
      if (def.typeName === 'ZodOptional') {
        initialValidatorShape[key] = z.string().optional();
        if (def.innerType._def.typeName === 'ZodArray') {
          const validator = z.union([z.string().transform((x) => [x]), z.string().array()]).optional();
          initialValidatorShape[key] = validator;
        }
      }
    }
    const initialValidator = z.object(initialValidatorShape).strict();
    const initialResult = initialValidator.safeParse(data);
    if (!initialResult.success) {
      throw new OpenApiValidationError(initialResult.error, paramSourceName);
    }
    const transformedParams: Record<string, unknown> = {};
    for (const field of Object.keys(initialResult.data)) {
      let type = finalShape[field]._def.typeName;
      let def = finalShape[field]._def;
      let validator = finalShape[field];
      if (type === 'ZodDefault') {
        type = def.innerType._def.typeName;
        validator = def.innerType;
        def = def.innerType._def;
      }
      if (type === 'ZodOptional') {
        type = def.innerType._def.typeName;
        validator = def.innerType;
        def = def.innerType._def;
      }
      const initialValue = initialResult.data[field];
      if (initialValue === undefined) {
        continue;
      }
      if (type === 'ZodString') {
        transformedParams[field] = initialValue;
        continue;
      }

      if (type === 'ZodArray') {
        const subtype = def.type._def.typeName;
        const values: unknown[] = [];
        for (const value of initialValue) {
          const val = this.convertValue(subtype, value, field, paramSourceName, def.type);
          values.push(val);
        }
        transformedParams[field] = values;
        continue;
      }
      const value: unknown = this.convertValue(type, initialValue, field, paramSourceName, validator);
      transformedParams[field] = value;
    }

    const result = finalValidator.safeParse(transformedParams);
    return result;
  }

  protected convertValue(
    type: string,
    initialValue: string,
    field: string,
    paramSourceName: string,
    validator: ZodTypeAny,
  ) {
    let value: string | number| Date | boolean | object = '';
    let typeName = 'Unknown';
    switch (type) {
      case 'ZodNumber':
        value = Number(initialValue);
        typeName = 'number';
        break;
      case 'ZodDate':
        value = new Date(Date.parse(initialValue));
        typeName = 'date';
        break;
      case 'ZodBoolean':
        if (initialValue === 'true') {
          value = true;
        }
        if (initialValue === 'false') {
          value = false;
        }
        typeName = 'boolean';
        break;
      case 'ZodNativeEnum':
        // eslint-disable-next-line no-case-declarations
        const parsed = validator.safeParse(initialValue);
        value = parsed.data ?? '';
        typeName = 'enum';
        break;
      default:
        throw new Error(`Couldn't parse ${field} from ${paramSourceName}, type '${type}' cannot be used`);
    }
    const stringValue = typeName === 'date' ? (value as Date).toISOString() : value.toString();
    if (stringValue !== initialValue) {
      throw new Error(`Couldn't parse ${field} is not a valid ${typeName}: ${stringValue} != ${initialValue}`);
    }
    return value;
  }


  public saveYaml(path: string) {
    this.logger.info('Generating YAML for Open API');
    const openApi: ZodOpenApiObject = {
      openapi: '3.1.0',
      info: {
        title: 'My API',
        version: '1.0.0',
      },
      components: {
        securitySchemes: {
          bearerHttpAuthentication: {
            type: 'apiKey',
            scheme: 'bearer',
            bearerFormat: 'jwt',
            name: 'authorization',
            in: 'header',
          },
          cookieClientAuthentication: {
            type: 'apiKey',
            // scheme: 'bearer',
            bearerFormat: 'jwt',
            name: 'authtoken',
            in: 'cookie',
          },
          cookieUserAuthentication: {
            type: 'apiKey',
            // scheme: 'bearer',
            bearerFormat: 'jwt',
            name: 'adminauthtoken',
            in: 'cookie',
          },
        },
      },
      paths: {},
      servers: [
        {
          url: 'http://localhost:3000/api/v1' + this.basePath,
          description: 'Local',
        },
      ],
    };
    const paths: ZodOpenApiPathsObject = {};
    for (const route of this.routes) {
      const requestParams: ZodOpenApiParameters = {
        query: route.queryValidator,
        path: route.pathValidator,
      };
      const operation: ZodOpenApiOperationObject = {
        requestParams: requestParams,
        description: route.description,
        responses: {
          200: {
            description: 'Good Response',
            content: {
              'application/json': {schema: route.responseValidator},
            },
          },
          500: {
            description: 'Unhandled Error',
            content: {
              'application/json': {
                schema: z.object({
                  error: z
                    .object({
                      code: z
                        .literal(OpenApiErrorCode.unknownError)
                        .openapi({description: 'Code to handle on the frontend'}),
                    })
                    .openapi({description: 'Error response'}),
                }),
              },
            },
          },
        },
      };
      if (['User', 'Client'].includes(route.type)) {
        operation.responses['401'] = {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: z.object({
                error: z
                  .object({
                    code: z
                      .enum([OpenApiErrorCode.unauthorized, OpenApiErrorCode.userNotFound])
                      .openapi({description: 'Code to handle on the frontend'}),
                  })
                  .openapi({description: 'Error response'}),
              }),
            },
          },
        };
      }

      operation.responses['400'] = {
        description: 'Action Error or Validation Error',
        content: {
          'application/json': {
            schema: z
              .union([
                // Action
                openApiActionErrorResponseValidator,
                // validationError
                openApiValidationErrorResponseValidator,
              ])
              .openapi({unionOneOf: true}),
          },
        },
      };
      operation.responses['422'] = {
        description:
          'Validation Error on Response. Always server-side problem. Introduced for debugging purposes, disabled in prod.',
        content: {
          'application/json': {
            schema: openApiValidationErrorResponseValidator,
          },
        },
      };
      if (route.type === 'Client') {
        operation.security = [
          {
            bearerHttpAuthentication: [],
            cookieClientAuthentication: [],
          },
        ];
      }
      if (route.type === 'User') {
        operation.security = [
          {
            bearerHttpAuthentication: [],
            cookieUserAuthentication: [],
          },
        ];
        operation.responses['403'] = {
          description: 'Permission Error',
          content: {
            'application/json': {
              schema: z.object({
                error: z
                  .object({
                    code: z
                      .literal(OpenApiErrorCode.missingPermission)
                      .openapi({description: 'Code to handle on the frontend'}),
                    permissions: z
                      .array(z.nativeEnum(Permission))
                      .openapi({description: 'List of possible permissions to allow access'}),
                  })
                  .openapi({description: 'Error response'}),
              }),
            },
          },
        };
      }
      if (route.method === 'POST' || route.method === 'PUT' || route.method === 'PATCH') {
        operation.requestBody = {
          content: {
            'application/json': {schema: route.bodyValidator},
          },
        };
      }
      const existingPath = paths[route.path] ?? {};
      paths[route.path] = {
        ...existingPath,
        [route.method.toLowerCase()]: operation,
      };
    }
    openApi.paths = paths;
    // this.logger.info('openApi', openApi)
    const document = createDocument(openApi);
    // this.logger.info('document', document)
    const yaml = stringify(document, {aliasDuplicateObjects: false});
    fs.writeFileSync(path, yaml);
  }
}
