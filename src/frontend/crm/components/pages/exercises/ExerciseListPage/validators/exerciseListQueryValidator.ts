import {boolean, number, TypeOf} from 'zod';
import {paginatedQueryValidator} from '../../../../../utils/validators/paginatedQueryValidator';

export const exerciseListQueryValidator = paginatedQueryValidator.extend({
  userId: number().optional(),
  parentsOnly: boolean().optional(),
});

export type ExerciseListQueryValidator = TypeOf<typeof exerciseListQueryValidator>
