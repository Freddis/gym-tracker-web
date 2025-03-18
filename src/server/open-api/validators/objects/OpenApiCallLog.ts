import {z} from 'zod';
import {openApiReferencedCallLogValidator} from './references/OpenApiReferencedCallLog';

export const openApiCallLogValidator = openApiReferencedCallLogValidator.extend({
}).openapi({description: 'Call Log'});

export type OpenApiCallLogValidator = typeof openApiCallLogValidator
export type OpenApiCallLog = z.TypeOf<OpenApiCallLogValidator>
