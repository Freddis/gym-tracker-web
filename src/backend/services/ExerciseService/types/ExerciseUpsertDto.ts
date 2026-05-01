import {StrictOmit} from '../../../types/StrictOmit';
import {Exercise} from './Exercise';

export type ExerciseUpsertDto = StrictOmit<Exercise, 'userId' | 'parentExerciseId' | 'variations'>
