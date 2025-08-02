import {nativeEnum, object, string, TypeOf} from 'zod';
import {Muscle} from '../../../../../utils/openapi-client';
// import {Muscle} from '../../../../../../common/enums/Muscle';

export const exeriseLibraryQueryValidator = object({
  filter: string().optional(),
  muscles: nativeEnum(Muscle).array().optional(),
});

export type ExerciseLibraryQueryParams = TypeOf<typeof exeriseLibraryQueryValidator>
