import {boolean, number, object, string, TypeOf} from 'zod';

export const FatsecretAuthResponseSchema = object({
  isLinked: boolean(),
  serverId: number(),
  deviceKey: string(),
  secretKey: string(),
  userName: string(),
  email: string(),
});
export type FatsecretAuthResponse = TypeOf<typeof FatsecretAuthResponseSchema>;
