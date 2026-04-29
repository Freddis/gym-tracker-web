import {imageValidator} from '../../images/validators/imageValidator';
import {string} from 'zod';

export const imageUpserDtoValidator = imageValidator.omit({
  userId: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
}).extend({
  url: string().nullable(),
  data: string().nullable(),
});
