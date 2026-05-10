import {string} from 'zod';
import {userValidator} from '../../users/validators/userValidator';

export const authUserValidator = userValidator.extend({
  email: string().openapi({description: 'Email of the user'}),
  jwt: string().openapi({description: 'JWT token. Used in API requests for authentication.'}),
}).openapi({ref: 'AuthUser', description: 'User object used for authentication purposes. Non public and contains private information.'});
