import {number, object, string} from 'zod';

export const userValidator = object({
  id: number(),
  name: string(),
  avatar: string(),
}).openapi({ref: 'User'});
