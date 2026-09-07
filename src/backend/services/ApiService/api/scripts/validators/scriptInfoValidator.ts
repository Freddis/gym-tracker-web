import {object, string} from 'zod';
import {scriptTypeValidator} from './scriptTypeValidator';

export const scriptInfoValidator = object({
  type: scriptTypeValidator,
  description: string().openapi({description: 'Description of what the script does'}),
}).openapi({ref: 'ScriptInfo', description: 'Available backoffice script'});
