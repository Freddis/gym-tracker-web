import {nativeEnum} from 'zod';
import {Country} from '../../../../../types/Country';

export const countryValidator = nativeEnum(Country).openapi({ref: 'Country', description: 'Country'});
