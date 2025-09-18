import {number, object, string} from 'zod';

export const paginatedQueryValidator = object({
  page: number().optional(),
  search: string().optional(),
});
