import {StictOmit} from '../../../types/StrictOmit';
import {Exercise} from './Exercise';

export interface ExerciseUpsertDto extends StictOmit<Exercise, 'id' |'userId' | 'parentExerciseId' | 'variations'> {
  id: number | null
}
