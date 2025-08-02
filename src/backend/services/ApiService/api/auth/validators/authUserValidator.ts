import {object, number, string} from 'zod';

export const authUserValidator = object({
  id: number().openapi({description: 'Id of the user'}),
  email: string().openapi({description: 'Email of the user'}),
  name: string().openapi({description: 'Name of the user'}),
  jwt: string().openapi({description: 'JWT token. Used in API requests for authentication.'}),
}).openapi({ref: 'AuthUser', description: 'User object used for authentication purposes. Non public and contains private information.'});
