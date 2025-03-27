import {ZodType, z} from 'zod';

export type OptionalZodParams<T extends ZodType | undefined> = T extends ZodType ? z.infer<T> : never
