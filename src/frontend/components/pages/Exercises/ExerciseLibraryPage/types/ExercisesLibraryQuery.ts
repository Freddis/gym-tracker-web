import {nativeEnum, object, string, TypeOf} from 'zod';
import {Equipment, Muscle} from '../../../../../utils/openapi-client';

export const exeriseLibraryQueryValidator = object({
  filter: string().optional(),
  muscles: nativeEnum(Muscle).array().optional(),
  equipment: nativeEnum(Equipment).optional(),
});

export type ExerciseLibraryQueryParams = TypeOf<typeof exeriseLibraryQueryValidator>
