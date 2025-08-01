import {number, object} from 'zod';

export const feedPageQuery = object({
  page: number().optional(),
});
