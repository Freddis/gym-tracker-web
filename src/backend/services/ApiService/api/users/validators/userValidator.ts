import {number, object, string} from 'zod';

export const userValidator = object({
  id: number().openapi({description: 'Id of the User'}),
  name: string().openapi({description: 'Name'}),
  profilePicture: string().openapi({description: 'Profile picture for display. Url of the image.'}),
}).openapi({
  ref: 'User',
  description: 'User. Public representation of the user, should not contain sensitive data',
});
