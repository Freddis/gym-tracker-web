import {nativeEnum} from 'zod';
import {Equipment} from '../../../../../types/Equipment';

export const equipmentValidator = nativeEnum(Equipment).openapi({ref: 'Equipment', description: 'Gym Equipment'});
