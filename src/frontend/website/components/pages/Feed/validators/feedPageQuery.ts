import {nativeEnum, number, object} from 'zod';
import {EntryType} from '../../../../../common/utils/openapi-client';

export const feedPageQuery = object({
  page: number().optional(),
  type: nativeEnum(EntryType).array().optional(),
});
