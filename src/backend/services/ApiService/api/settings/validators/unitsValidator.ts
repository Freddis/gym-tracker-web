import {object} from 'zod';
import {distanceUnitValidator} from './distanceUnitValidator';
import {hightUnitValidator} from './hightUnitValidator';
import {temperatureUnitValidator} from './temperatureUnitValidator';
import {weightUnitValidator} from './weightUnitValidator';

export const unitsValidator = object({
  weight: weightUnitValidator,
  distance: distanceUnitValidator,
  height: hightUnitValidator,
  temperature: temperatureUnitValidator,
}).openapi({ref: 'UnitSettings', description: 'Unit preferences of the user'});
