import {z} from 'zod';

export const authUserValidator = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  jwt: z.string(),
});
export type AuthUser = z.TypeOf<typeof authUserValidator>
