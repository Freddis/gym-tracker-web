import {number, object} from 'zod';

export const userListQueryParams = object({
  page: number().optional(),
});
