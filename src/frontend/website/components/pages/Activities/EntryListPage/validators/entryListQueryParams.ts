import {date, nativeEnum, number, object, TypeOf} from 'zod';
import {EntryType} from '../../../../../../common/utils/openapi-client';

export const entryListQueryParams = object({
  page: number().optional(),
  type: nativeEnum(EntryType).array().optional(),
  date: date({coerce: true}).optional(),
});

export type EntryListQueryParams = TypeOf<typeof entryListQueryParams>;
