import {StictOmit} from '../../../../common/types/StrictOmit';
import {Exercise} from './Exercise';

export interface ExerciseUpsertDto extends StictOmit<Exercise, 'id' |'userId' | 'parentExerciseId' | 'variations' | 'muscles'> {
  id: number | null
}
