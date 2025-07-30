import {TypeOf} from 'zod';
import {argusCheckinRowValidator} from '../../DrizzleService/types/ArgusCheckinRow/ArgusCheckinRow';

export const argusCheckinValidator = argusCheckinRowValidator;
export type ArgusCheckIn = TypeOf<typeof argusCheckinValidator>
