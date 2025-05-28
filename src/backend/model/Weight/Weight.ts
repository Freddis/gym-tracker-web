import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';
import {z} from 'zod';

export const weightValidator = createSelectSchema(dbSchema.weight).extend({
}).openapi({ref: 'Weight'});
export type WeightValidator = typeof weightValidator;
export type Weight = z.TypeOf<WeightValidator>;
