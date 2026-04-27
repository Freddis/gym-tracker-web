import {nativeEnum} from 'zod';
import {ExternalSource} from '../../../../EntryService/types/ExternalSource';

export const externalSourceValidator = nativeEnum(ExternalSource).openapi({
  ref: 'ExternalSource',
  description: 'External source of the entry. Another app.'}
);
