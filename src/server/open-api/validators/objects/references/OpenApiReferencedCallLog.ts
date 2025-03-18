import {z} from 'zod';


export const openApiReferencedCallLogValidator = z.object({
  id: z.number().openapi({description: 'Call Log ID'}),
  duration: z.number().nullable().openapi({description: 'Duration in seconds'}),
  createdAt: z.date().openapi({description: 'Time when call was created'}),
  recording: z.object({
    url: z.string().openapi({description: 'Url to the recording file'}),
  }).nullable().openapi({description: 'Call log recording'}),
}).openapi({description: 'Call Log reference (smaller number of fields)'});

export type OpenApiReferencedCallLogValidator = typeof openApiReferencedCallLogValidator
export type OpenApiReferencedCallLog = z.TypeOf<OpenApiReferencedCallLogValidator>
