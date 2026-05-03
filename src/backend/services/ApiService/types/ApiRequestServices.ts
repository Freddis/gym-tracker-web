import {AuthService} from 'src/backend/services/AuthService/AuthService';
import {ArgusCheckinService} from 'src/backend/services/ArgusCheckinService/ArgusCheckinService';
import {ExerciseService} from 'src/backend/services/ExerciseService/ExerciseService';
import {WorkoutService} from 'src/backend/services/WorkoutService/WorkoutService';
import {WeightService} from '../../WeightService/WeightService';
import {EntryService} from '../../EntryService/EntryService';
import {UserService} from '../../UserService/UserService';
import {ManagerService} from '../../ManagerService/ManagerService';
import {WorkoutPlanService} from '../../WorkoutPlanService/WorkoutPlanService';
import {WorkoutTypeService} from '../../WorkoutTypeService/WorkoutTypeService';
import {TranslationService} from '../../TranslationService/TranslationService';
import {FoodService} from '../../FoodService/FoodService';

export interface ApiRequestServices {
  auth: AuthService
  models: {
    argusCheckin: ArgusCheckinService
    exercise: ExerciseService
    workout: WorkoutService
    workoutPlan: WorkoutPlanService
    workoutType: WorkoutTypeService
    weight: WeightService
    food: FoodService
    entry: EntryService
    user: UserService
    manager: ManagerService
    translation: TranslationService
  }
}
