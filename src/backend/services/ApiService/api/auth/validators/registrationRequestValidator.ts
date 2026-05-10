import {number, object, string} from 'zod';
import {countryValidator} from '../../settings/validators/countryValidator';
import {genderValidator} from '../../settings/validators/genderValidator';
import {RouteFactory} from '../../../utils/RouteFactory';

export const registrationRequestValidator = object({
  name: string().nonempty().openapi({description: 'Name of the user. Displayed in the app.'}),
  email: string().email().openapi({description: 'Email of the user. Stays hidden on public pages.'}),
  password: string().min(5).openapi({description: 'Password'}),
  passwordConfirmation: string().nonempty().openapi({description: 'Confirmation of password. Protection from typos'}),
  gender: genderValidator,
  country: countryValidator,
  birthDate: RouteFactory.validators.strings.datetime.openapi({description: 'Birth date of the user'}),
  height: number().openapi({description: 'Height of the user'}),
});
