import {StrictOmit} from '../../../types/StrictOmit';
import {Exercise} from './Exercise';

export interface ExerciseUpsertDto extends StrictOmit<Exercise, 'id' |'userId' | 'parentExerciseId' | 'variations'> {
  id: number | null
}
