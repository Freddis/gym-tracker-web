import {Exercise} from './Exercise';

export type ManagedExerciseUpdateDto = Partial<Exclude<Exercise, 'imageId'>> & {image?: string}
