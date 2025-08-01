import {OpenApiRouteMap} from 'strap-on-openapi';
import {ApiRouteType} from '../types/ApiRouteType';
import {getArgusCheckins} from '../api/argus-checkins/getArgusCheckins';
import {getArgusCheckinTypes} from '../api/argus-checkins/getArgusCheckinTypes';
import {loginUser} from '../api/auth/loginUser';
import {registerUser} from '../api/auth/registerUser';
import {createExercise} from '../api/exercises/createExercise';
import {deleteExercise} from '../api/exercises/deleteExercise';
import {getBuiltInExerciseList} from '../api/exercises/getBuiltInExerciseList';
import {getExercise} from '../api/exercises/getExercise';
import {getExerciseList} from '../api/exercises/getExerciseList';
import {updateExercise} from '../api/exercises/updateExercise';
import {upsertExercises} from '../api/exercises/upsertExercises';
import {createWeight} from '../api/weight/createWeight';
import {createWorkout} from '../api/workouts/createWorkout';
import {deleteWorkout} from '../api/workouts/deleteWorkout';
import {getWorkout} from '../api/workouts/getWorkout';
import {getWorkoutList} from '../api/workouts/getWorkoutList';
import {updateWorkout} from '../api/workouts/updateWorkout';
import {upsertWorkouts} from '../api/workouts/upsertWorkouts';
import {getEntryList} from '../api/entries/validators/getEntryList';


export const openApiRoutes: OpenApiRouteMap<ApiRouteType> = {
  '/auth': [
    registerUser,
    loginUser,
  ],
  '/exercises': [
    createExercise,
    getExerciseList,
    getBuiltInExerciseList,
    getExercise,
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
  '/entries': [
    getEntryList,
  ],
};
