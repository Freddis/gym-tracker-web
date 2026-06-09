import {object, nativeEnum, union} from 'zod';
import {EntryType} from '../../../../EntryService/types/EntryType';
import {RouteFactory} from '../../../utils/RouteFactory';

export const getEntryListQueryValidator = object({
  page: RouteFactory.validators.strings.number.optional().openapi({description: 'Page'}),
  type: union([
    nativeEnum(EntryType).transform((x) => [x]),
    nativeEnum(EntryType).array(),
  ]).optional().openapi({description: 'Filters excercises by type.'}),
  own: RouteFactory.validators.strings.boolean.optional().openapi({description: 'Only return entries for the current user.'}),
  date: RouteFactory.validators.strings.datetime.optional().openapi({description: 'Only return entries from this date.'}),
  updatedAfter: RouteFactory.validators.strings.datetime.optional().openapi({description: 'Only return entries updated after this date.'}),
  includeDeleted: RouteFactory.validators.strings.boolean.optional().openapi({description: 'Include deleted entries.'}),
});
