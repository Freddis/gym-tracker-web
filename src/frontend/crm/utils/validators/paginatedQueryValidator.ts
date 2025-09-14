import {number, object} from 'zod';

export const paginatedQueryValidator = object({
  page: number().optional(),
});
