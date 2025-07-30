import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from './db';
import {nativeEnum, TypeOf} from 'zod';
import {Muscle} from '../../../../common/enums/Muscle';

export const exerciseMuscleValidator = createSelectSchema(dbSchema.muscles).extend({
  muscle: nativeEnum(Muscle),
});

export type ExerciseMuscleValidator = typeof exerciseMuscleValidator;
export type ExerciseMuscleRow = TypeOf<ExerciseMuscleValidator>;
