import {literal} from 'zod';
import {EntryType} from '../../../../EntryService/types/EntryType';
import {entryValidator} from '../../entries/validators/entryValidator';
import {imageValidator} from '../../images/validators/imageValidator';

export const postEntryValidator = entryValidator.extend({
  type: literal(EntryType.Post).openapi({description: 'Type'}),
  image: imageValidator.nullable().openapi({description: 'Image'}),
}).openapi({ref: 'PostEntry', description: 'Post entry'});
