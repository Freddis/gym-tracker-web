import {date, nativeEnum, number, object, string, TypeOf} from 'zod';
import {parseISO} from 'date-fns';
import {EntryType} from '../../../../../../common/utils/openapi-client';

// the url carries a bare day, which means midnight in the user's timezone, while new Date() would read it as utc
const localDate = date().or(string().transform((value) => parseISO(value)).pipe(date()));

export const entryListQueryParams = object({
  page: number().optional(),
  type: nativeEnum(EntryType).array().optional(),
  date: localDate.optional(),
});

export type EntryListQueryParams = TypeOf<typeof entryListQueryParams>;
