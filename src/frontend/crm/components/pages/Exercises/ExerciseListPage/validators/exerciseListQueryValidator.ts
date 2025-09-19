import {number, string, TypeOf} from 'zod';
import {paginatedQueryValidator} from '../../../../../utils/validators/paginatedQueryValidator';

export const exerciseListQueryValidator = paginatedQueryValidator.extend({
  filter: string().optional(),
  userId: number().optional(),
});

export type ExerciseListQueryValidator = TypeOf<typeof exerciseListQueryValidator>
