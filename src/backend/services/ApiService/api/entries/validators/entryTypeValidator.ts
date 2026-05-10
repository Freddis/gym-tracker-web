import {nativeEnum} from 'zod';
import {EntryType} from '../../../../EntryService/types/EntryType';

export const entryTypeValidator = nativeEnum(EntryType).openapi({ref: 'Entry Type', description: 'Entry type'});
