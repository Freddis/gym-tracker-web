import 'zod-openapi/extend';
import fs from 'fs';
import {stringify} from 'yaml';
import {
  z,
  ZodArray,
  ZodDefault,
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
import {Logger} from '../../../utls/Logger/Logger';
import {OpenApiErrorCode} from './enums/OpenApiErrorCode';
import {ValidationLocations} from './enums/ValidationLocations';
import {OpenApiActionError} from './types/errors/OpenApiActionError';
import {OpenApiError} from './types/errors/OpenApiError';
import {OpenApiPermissionError} from './types/errors/OpenApiPermissionError';
import {OpenApiValidationError} from './types/errors/OpenApiValidationError';
import {OpenApiErrorResponse} from './types/responses/OpenApiErrorResponse';
import {OpenApiRoute} from './types/OpenApiRoute';
import {Permission} from './types/Permission';
import {OpenApiRoutingFactory} from './OpenApiRoutingFactory';
import {RouteExtraPropsMap} from './types/RouteExtraPropsMap';
import {RouteContextMap} from './types/RouteContextMap';
import {RouteContextCreatorMap} from './types/RouteContextCreatorMap';
import {OpenApiRouteMap} from './types/OpenApiRouteMap';

export class OpenApiService<
  TRouteTypes extends string,
  TContextMap extends RouteContextMap<TRouteTypes> = RouteContextMap<TRouteTypes>,
  TPropsMap extends RouteExtraPropsMap<TRouteTypes> = RouteExtraPropsMap<TRouteTypes>,
> {

  protected routes: OpenApiRoute<TRouteTypes, TContextMap>[] = [];
  protected logger: Logger;
  // protected auth: OpenApiAuthService;
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
  public readonly factory: OpenApiRoutingFactory<TRouteTypes, TContextMap, TPropsMap>;
  contextMap: RouteContextCreatorMap<TRouteTypes, TContextMap>;


  constructor(contextMap: RouteContextCreatorMap<TRouteTypes, TContextMap>) {
    this.contextMap = contextMap;
    this.logger = new Logger('OpenAPI');
    this.factory = new OpenApiRoutingFactory<TRouteTypes, TContextMap, TPropsMap>(contextMap);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public addRoutes(pathExtension: string, routes: (OpenApiRoute<any, any>)[]) {
    const newRoutes = routes.map((x) => ({...x, path: pathExtension + x.path}));
    this.routes.push(...newRoutes);
  }

  public addRoutesByMap(routeMap: OpenApiRouteMap) {
    for (const row of routeMap) {
      this.addRoutes(row.path, row.routes);
    }
  }
  protected checkRouteDescriptions(route: OpenApiRoute<TRouteTypes, TContextMap>) {
    const minimalLength = 10;
    if (!route.description || route.description.length < minimalLength) {
      throw new Error(`Description for ${route.path} is missing or too small`);
    }
    this.checkValidatorDescriptions(route, 'responseValidator', 'responseValidator', route.validators.response);
    this.checkValidatorDescriptions(route, 'pathValidator', 'pathValidator', route.validators.path ?? z.object({}), false);
    this.checkValidatorDescriptions(route, 'queryValidator', 'queryValidator', route.validators.query ?? z.object({}), false);
    if (route.method === 'POST' && route.validators.body) {
      this.checkValidatorDescriptions(route, 'bodyValidator', 'bodyValidator', route.validators.body ?? z.object({}), false);
    }
  }

  protected checkValidatorDescriptions(
    route: OpenApiRoute<TRouteTypes, TContextMap>,
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

  protected checkShapeDescription(route: OpenApiRoute<TRouteTypes, TContextMap>, validatorName: string, shape: ZodRawShape) {
    for (const field of Object.keys(shape)) {
      const value = shape[field] as ZodObject<ZodRawShape>;
      this.checkValidatorDescriptions(route, validatorName, field, value);
    }
  }

  protected getRouteForPath(path: string, method: string): OpenApiRoute<TRouteTypes, TContextMap> | null {
    const fittingRoutes: OpenApiRoute<TRouteTypes, TContextMap>[] = [];
    outer:
    for (const route of this.routes) {
      if (route.method === method) {
        fittingRoutes.push(route);
        const routeParts = route.path.split('/').filter((x) => x !== '');
        const pathParts = path.split('/').filter((x) => x !== '');
        if (routeParts.length !== pathParts.length) {
          continue;
        }
        for (let i = 0; i < routeParts.length; i++) {
          const chunk = routeParts[i];
          if (chunk.includes('{')) {
            continue;
          }
          if (chunk !== pathParts[i]) {
            continue outer;
          }
        }
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
      const route = this.getRouteForPath(urlPath, originalReq.method);
      if (!route) {
        throw new OpenApiError(OpenApiErrorCode.notFound);
      }

      // obtaining path params
      const pathParams: Record<string, string> = {};
      const routeParts = route.path.split('/');
      const pathParts = urlPath.split('/');
      for (let i = 0; i < routeParts.length; i++) {
        const chunk = routeParts[i];
        if (chunk.startsWith('{') && chunk.endsWith('}')) {
          const name = chunk.slice(1, chunk.length - 1);
          pathParams[name] = pathParts[i];
          continue;
        }
      }

      let body = {};
      try {
        body = await originalReq.json();
      } catch {
        //nothing
      }
      const req = {
        path: urlPath,
        method: originalReq.method,
        params: pathParams,
        query: Object.fromEntries(url.searchParams.entries()),
        body: body,
      };

      this.logger.info(`Calling route ${route.path}`);
      this.logger.info(`${req.method}: ${req.path}`, {
        params: req.params,
        query: req.query,
        body: req.body,
      });
      const query = this.convertStringsAndSafeParse(
        route.validators.query?.strict() ?? z.object({}),
        req.query,
        ValidationLocations.query,
      );
      if (!query.success) {
        throw new OpenApiValidationError(query.error, ValidationLocations.query);
      }
      const path = this.convertStringsAndSafeParse(
      route.validators.path?.strict() ?? z.object({}),
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
      if (containsBody && route.validators.body) {
        const body = route.validators.body.safeParse(req.body);
        if (!body.success) {
          throw new OpenApiValidationError(body.error, ValidationLocations.body);
        }
        // const context = await this.createContext(originalReq, route, path.data, query.data, body.data);
        const context = await this.contextMap[route.type]({
          route: route,
          request: originalReq,
          params: {
            query: query.data,
            path: path.data,
            body: body.data,
          },
        });
        response = await route.handler({
          ...context,
          params: {
            query: query.data,
            path: path.data,
            body: body.data,
          },
        });
      } else {
        const context = await this.contextMap[route.type]({
          route: route,
          request: originalReq,
          params: {
            query: query.data,
            path: path.data,
            body: {},
          },
        });
        response = await route.handler({...context, params: {
          query: query.data,
          path: path.data,
          body: {},
        }});
      }

      const validated = route.validators.response.safeParse(response);
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
        query: route.validators.query,
        path: route.validators.path,
      };
      const operation: ZodOpenApiOperationObject = {
        requestParams: requestParams,
        description: route.description,
        responses: {
          200: {
            description: 'Good Response',
            content: {
              'application/json': {schema: route.validators.response},
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
            'application/json': {schema: route.validators.body},
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
