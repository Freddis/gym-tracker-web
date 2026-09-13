import {StrictOmit} from '../../../types/StrictOmit';
import {ImageUpsertDto} from '../../EntryService/types/EntryUpsertDto';
import {Exercise} from './Exercise';

export interface ExerciseUpsertDto extends StrictOmit<Exercise, 'userId' | 'parentExerciseId' | 'variations' | 'images'> {
  images: ImageUpsertDto[]
}
