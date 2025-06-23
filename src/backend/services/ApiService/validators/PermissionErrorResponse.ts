
import {z} from 'zod';
import {ApiErrorCode} from '../types/ApiErrorCode';
import {Permission} from '../types/Permission';

export const permissionErrorResponseValidator = z.object({
  error: z.object({
    code: z.literal(ApiErrorCode.MissingPermission).openapi({description: 'Code to handle on the frontend'}),
    requiredPermissions: z.array(z.nativeEnum(Permission)).openapi({description: 'List of possible permissions to allow access'}),
  }).openapi({description: 'Error response'}),
});

export type PermissionErrorResponseValidator = typeof permissionErrorResponseValidator
export type PermissionErrorResponse = z.TypeOf<PermissionErrorResponseValidator>
