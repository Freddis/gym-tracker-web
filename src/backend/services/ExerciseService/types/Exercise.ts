import {Muscle} from '../../../../common/enums/Muscle';
import {ExerciseRow} from '../../DrizzleService/types/ExerciseRow';

export interface Exercise extends ExerciseRow {
  variations: Omit<Exercise, 'variations'>[]
  muscles: {
    primary: Muscle[]
    secondary: Muscle[]
  }
}
