import {object, string} from 'zod';
import {RouteFactory} from '../utils/RouteFactory';

export const crmPaginatedQuery = object({
  page: RouteFactory.validators.strings.number.optional().default('1').openapi({description: 'Page'}),
  search: string().optional().openapi({description: 'Filters exercises by name'}),
});
