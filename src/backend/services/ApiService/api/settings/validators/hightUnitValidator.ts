import {nativeEnum} from 'zod';
import {HeightUnit} from '../../../../../types/HeightUnit';

export const hightUnitValidator = nativeEnum(HeightUnit).openapi({ref: 'HeightUnit', description: 'Height unit'});
