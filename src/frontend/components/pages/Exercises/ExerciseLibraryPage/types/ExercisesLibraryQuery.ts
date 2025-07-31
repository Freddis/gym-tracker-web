import {nativeEnum, object, string, TypeOf} from 'zod';
import {Muscle} from '../../../../../../common/enums/Muscle';

export const exceriseLibraryQueryValidator = object({
  filter: string().optional(),
  muscles: nativeEnum(Muscle).array().optional(),
});

export type ExerciseLibraryQueryParams = TypeOf<typeof exceriseLibraryQueryValidator>
