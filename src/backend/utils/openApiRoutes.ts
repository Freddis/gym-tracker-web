import {deleteExercise} from '../../routes/api/v1/exercises/deleteExercise';
import {updateExercise} from '../../routes/api/v1/exercises/updateExercise';
import {getExercise} from '../../routes/api/v1/exercises/getExercise';
import {getEntryTypes} from '../../routes/api/v1/entries/getEntryTypes';
import {getExerciseList} from '../../routes/api/v1/exercises/getExerciseList';
import {createExercise} from '../../routes/api/v1/exercises/createExercise';
import {getEntries} from '../../routes/api/v1/entries/getEntries';
import {registerUser} from '../../routes/api/v1/auth/registerUser';
import {loginUser} from '../../routes/api/v1/auth/loginUser';
import {OpenApiRouteMap} from '../services/OpenApiService/types/OpenApiRouteMap';
import {getWorkoutList} from '../../routes/api/v1/workouts/getWorkoutList';
import {getWorkout} from '../../routes/api/v1/workouts/getWorkout';
import {createWorkout} from '../../routes/api/v1/workouts/createWorkout';
import {deleteWorkout} from '../../routes/api/v1/workouts/deleteWorkout';
import {updateWorkout} from '../../routes/api/v1/workouts/updateWorkout';

export const openApiRoutes: OpenApiRouteMap = [
  {
    path: '/auth',
    routes: [
      registerUser,
      loginUser,
    ],
  },
  {
    path: '/exercises',
    routes: [
      createExercise,
      getExercise,
      getExerciseList,
      updateExercise,
      deleteExercise,
    ],
  },
  {
    path: '/workouts',
    routes: [
      createWorkout,
      getWorkout,
      getWorkoutList,
      updateWorkout,
      deleteWorkout,
    ],
  },
  {
    path: '/entries',
    routes: [
      getEntries,
      getEntryTypes,
    ],
  },
];
