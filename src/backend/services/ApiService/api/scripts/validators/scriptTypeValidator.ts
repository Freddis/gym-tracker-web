import {nativeEnum} from 'zod';
import {ScriptType} from '../../../../ScriptService/types/ScriptType';

export const scriptTypeValidator = nativeEnum(ScriptType).openapi({
  ref: 'ScriptType',
  description: 'Type of backoffice script',
});
