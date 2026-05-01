import {nativeEnum} from 'zod';
import {Muscle} from '../../../../../types/Muscle';

export const muscleValidator = nativeEnum(Muscle).openapi({ref: 'Muscle', description: 'Body Muscle'});
