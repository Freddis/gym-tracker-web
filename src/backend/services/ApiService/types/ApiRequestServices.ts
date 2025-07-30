import {AuthService} from 'src/backend/services/AuthService/AuthService';
import {ArgusCheckinService} from 'src/backend/services/ArgusCheckinService/ArgusCheckinService';
import {ExerciseService} from 'src/backend/services/ExerciseService/ExerciseService';
import {WorkoutService} from 'src/backend/services/WorkoutService/WorkoutService';
import {WeightService} from '../../WeightService/WeightService';

export interface ApiRequestServices {
  auth: AuthService
  models: {
    argusCheckin: ArgusCheckinService
    exercise: ExerciseService
    workout: WorkoutService
    weight: WeightService
  }
}
