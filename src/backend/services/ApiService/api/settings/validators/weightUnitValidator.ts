import {nativeEnum} from 'zod';
import {WeightUnit} from '../../../../../types/WeightUnit';

export const weightUnitValidator = nativeEnum(WeightUnit).openapi({ref: 'WeightUnit', description: 'Weight unit'});
