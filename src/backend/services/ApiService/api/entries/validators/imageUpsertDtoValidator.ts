import {object, string} from 'zod';

export const imageUpsertDtoValidator = object({
  data: string(),
});
