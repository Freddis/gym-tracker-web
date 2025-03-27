import {ZodFirstPartySchemaTypes, ZodObject, ZodRawShape} from 'zod';
import {Permission} from '../Permission';

export interface BaseOpenApiRoute<
  X extends ZodObject<ZodRawShape>,
  T extends ZodFirstPartySchemaTypes,
  Z extends ZodObject<ZodRawShape>
> {
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
  type: 'User' | 'Client' | 'Unauthorized'
  path: string
  description: string
  queryValidator: X
  pathValidator: Z
  responseValidator: T
  permissions: Permission[]
}
