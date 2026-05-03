import {number, object, string} from 'zod';

export const foodListQueryValidator = object({
  search: string().optional(),
  page: number().optional(),
});
