import {OpenApiRouteMap} from 'strap-on-openapi';
import {ApiRouteType} from '../../common/types/ApiRouteType';
import {getArgusCheckins} from '../api/v1/argus-checkins/getArgusCheckins';
import {loginUser} from '../api/v1/auth/loginUser';
import {registerUser} from '../api/v1/auth/registerUser';
import {createExercise} from '../api/v1/exercises/createExercise';
import {deleteExercise} from '../api/v1/exercises/deleteExercise';
import {getExercise} from '../api/v1/exercises/getExercise';
import {getExerciseList} from '../api/v1/exercises/getExerciseList';
import {updateExercise} from '../api/v1/exercises/updateExercise';
import {upsertExercises} from '../api/v1/exercises/upsertExercises';
import {createWeight} from '../api/v1/weight/createWeight';
import {createWorkout} from '../api/v1/workouts/createWorkout';
import {deleteWorkout} from '../api/v1/workouts/deleteWorkout';
import {getWorkout} from '../api/v1/workouts/getWorkout';
import {getWorkoutList} from '../api/v1/workouts/getWorkoutList';
import {updateWorkout} from '../api/v1/workouts/updateWorkout';
import {upsertWorkouts} from '../api/v1/workouts/upsertWorkouts';
import {getArgusCheckinTypes} from '../api/v1/argus-checkins/getArgusCheckinTypes';

export const openApiRoutes: OpenApiRouteMap<ApiRouteType> = {
  '/auth': [
    registerUser,
    loginUser,
  ],
  '/exercises': [
    createExercise,
    getExercise,
    getExerciseList,
    updateExercise,
    upsertExercises,
    deleteExercise,
  ],
  '/workouts': [
    createWorkout,
    getWorkout,
    getWorkoutList,
    updateWorkout,
    upsertWorkouts,
    deleteWorkout,
  ],
  '/weight': [
    createWeight,
  ],
  '/argus': [
    getArgusCheckins,
    getArgusCheckinTypes,
  ],
};
