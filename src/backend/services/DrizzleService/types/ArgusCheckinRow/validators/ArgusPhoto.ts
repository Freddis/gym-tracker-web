import z from 'zod';

export const argusPhotoValidator = z.object({
  id: z.string(),
  href: z.string(),
});

export type ArgusPhoto = z.infer<typeof argusPhotoValidator>;
