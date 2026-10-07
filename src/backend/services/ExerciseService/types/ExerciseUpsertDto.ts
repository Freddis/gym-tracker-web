import {StrictOmit} from '../../../types/StrictOmit';
import {ImageUpsertDto} from '../../ImageService/types/ImageUpsertDto';
import {Exercise} from './Exercise';

export interface ExerciseUpsertDto extends StrictOmit<Exercise, 'userId' | 'parentExerciseId' | 'variations' | 'images'> {
  images: ImageUpsertDto[]
}
