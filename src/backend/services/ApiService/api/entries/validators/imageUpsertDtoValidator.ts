import {boolean, object, string} from 'zod';

export const imageUpsertDtoValidator = object({
  id: string().openapi({description: 'Id of the image'}),
  isDeleted: boolean().optional().openapi({description: 'Whether the image is deleted'}),
  data: string().optional().openapi({description: 'Base64 encoded image data'}),
}).openapi({ref: 'ImageUpsertDto', description: 'Image to upsert'});
