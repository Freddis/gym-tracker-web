import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';
import {nativeEnum, TypeOf} from 'zod';
import {Equipment} from '../../../../common/enums/Equipment';

export const exerciseRowValidator = createSelectSchema(dbSchema.exercises).extend({
  equipment: nativeEnum(Equipment).nullable(),
});
export type ExerciseValidator = typeof exerciseRowValidator;
export type ExerciseRow = TypeOf<ExerciseValidator>
