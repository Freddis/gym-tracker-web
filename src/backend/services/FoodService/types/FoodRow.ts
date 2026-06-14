import {AppDbSchema} from '../../DrizzleService/DrizzleService';

export type FoodRow = AppDbSchema['food']['$inferSelect'];
