import {boolean, object} from 'zod';

export const emptyOperationResponse = object({
  success: boolean().openapi({
    description: 'Stub for response. Always true since otherwise error is thrown.',
  }),
}).openapi({description: 'Indicator of successfult operation'});
