import {nativeEnum} from 'zod';
import {DistanceUnit} from '../../../../../types/DistanceUnit';

export const distanceUnitValidator = nativeEnum(DistanceUnit).openapi({ref: 'DistanceUnit', description: 'Distance unit'});
