import {object, string} from 'zod';

export const imageUpsertDtoValidator = object({
  data: string(),
}).openapi({ref: 'ImageUpsertDto', description: 'Image to upsert'});
