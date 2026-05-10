import {nativeEnum} from 'zod';
import {Gender} from '../../../../../types/Gender';

export const genderValidator = nativeEnum(Gender).openapi({ref: 'Gender', description: 'Gender'});
