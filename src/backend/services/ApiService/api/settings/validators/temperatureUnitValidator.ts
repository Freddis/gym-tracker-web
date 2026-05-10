import {nativeEnum} from 'zod';
import {TemperatureUnit} from '../../../../../types/TemperatureUnit';

export const temperatureUnitValidator = nativeEnum(TemperatureUnit).openapi({ref: 'TemperatureUnit', description: 'Temperature unit'});
