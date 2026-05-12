import {Goal} from './Goal';
import {User} from '../../../UserService/types/User';
import {Gender} from '../../../../types/Gender';
import {DistanceUnit} from '../../../../types/DistanceUnit';
import {HeightUnit} from '../../../../types/HeightUnit';
import {TemperatureUnit} from '../../../../types/TemperatureUnit';
import {WeightUnit} from '../../../../types/WeightUnit';

export interface UserProfile {
  user: User;
  goals: Goal[]
  note: string | null
  height: number
  weight: number | null
  age: number
  gender: Gender
  units: {
    weight: WeightUnit
    distance: DistanceUnit
    height: HeightUnit
    temperature: TemperatureUnit
  }
  consumedCalories: {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  }
}
