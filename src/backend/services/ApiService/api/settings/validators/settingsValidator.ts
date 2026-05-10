import {object, number, string} from 'zod';
import {genderValidator} from './genderValidator';
import {entryVisibilityValidator} from '../../entries/validators/entryVisibilityValidator';
import {countryValidator} from './countryValidator';
import {weightUnitValidator} from './weightUnitValidator';
import {distanceUnitValidator} from './distanceUnitValidator';
import {hightUnitValidator} from './hightUnitValidator';
import {temperatureUnitValidator} from './temperatureUnitValidator';
import {RouteFactory} from '../../../utils/RouteFactory';
import {imageValidator} from '../../images/validators/imageValidator';

const unitsValidator = object({
  weight: weightUnitValidator,
  distance: distanceUnitValidator,
  height: hightUnitValidator,
  temperature: temperatureUnitValidator,
}).openapi({ref: 'UnitSettings', description: 'Unit preferences of the user'});

const securityValidator = object({
  email: string().email().openapi({description: 'Email of the user'}),
  visibility: entryVisibilityValidator,
}).strict().openapi({ref: 'SecuritySettings', description: 'Security settings of the user'});

export const settingsValidator = object({
  name: string().openapi({description: 'Name of the user'}),
  note: string().nullable().openapi({description: 'Note of the user'}),
  height: number().openapi({description: 'Height of the user'}),
  weight: number().nullable().openapi({description: 'Weight of the user'}),
  gender: genderValidator,
  birthDate: RouteFactory.validators.strings.datetime.openapi({description: 'Birth date of the user'}),
  country: countryValidator,
  profilePicture: imageValidator.nullable().openapi({description: 'Profile picture of the user'}),
  units: unitsValidator,
  security: securityValidator,
}).strict().openapi({ref: 'Settings', description: 'Settings of the user'});
