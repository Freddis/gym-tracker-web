import {literal} from 'zod';
import {EntryType} from '../../../../EntryService/types/EntryType';
import {entryValidator} from '../../entries/validators/entryValidator';
import {imageValidator} from './imageValidator';

export const imageEntryValidator = entryValidator.extend({
  type: literal(EntryType.Image).openapi({description: 'Type'}),
  image: imageValidator,
}).openapi({ref: 'ImageEntry', description: 'Image entry'});
