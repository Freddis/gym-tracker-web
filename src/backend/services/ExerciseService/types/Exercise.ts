import {Equipment} from '../../../types/Equipment';
import {Muscle} from '../../../types/Muscle';
import {Image} from '../../ImageService/types/Image';

export interface Exercise {
  id: string;
  name: string;
  description: string | null;
  difficulty: number | null;
  params: number[];
  equipment: Equipment | null;
  images: Image[];
  userId: number | null;
  copiedFromId: string | null;
  parentExerciseId: string | null;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  variations: Omit<Exercise, 'variations'>[]
  muscles: {
    primary: Muscle[]
    secondary: Muscle[]
  }
}
