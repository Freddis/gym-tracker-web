import {object, string} from 'zod';

export const baseFoodValidator = object({
  name: string().nonempty(),
  description: string().nullable(),
  image: string().optional(),
});
