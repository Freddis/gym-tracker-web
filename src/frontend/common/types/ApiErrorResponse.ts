import {GetExercisesBuiltInError, GetWorkoutsError, GetExercisesError} from '../utils/openapi-client';

export interface ApiErrorResponse {
  error: GetExercisesBuiltInError['error'] | GetWorkoutsError['error'] | GetExercisesError['error']
}
