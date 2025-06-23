
import {OpenApiRouteMap} from 'strap-on-openapi';
import {ApiRouteType} from '../../common/types/ApiRouteType';
import {getArgusCheckins} from '../../routes/api/v1/argus-checkins/getArgusCheckins';
import {loginUser} from '../../routes/api/v1/auth/loginUser';
import {registerUser} from '../../routes/api/v1/auth/registerUser';
import {createExercise} from '../../routes/api/v1/exercises/createExercise';
import {deleteExercise} from '../../routes/api/v1/exercises/deleteExercise';
import {getExercise} from '../../routes/api/v1/exercises/getExercise';
import {getExerciseList} from '../../routes/api/v1/exercises/getExerciseList';
import {updateExercise} from '../../routes/api/v1/exercises/updateExercise';
import {upsertExercises} from '../../routes/api/v1/exercises/upsertExercises';
import {createWeight} from '../../routes/api/v1/weight/createWeight';
import {createWorkout} from '../../routes/api/v1/workouts/createWorkout';
import {deleteWorkout} from '../../routes/api/v1/workouts/deleteWorkout';
import {getWorkout} from '../../routes/api/v1/workouts/getWorkout';
import {getWorkoutList} from '../../routes/api/v1/workouts/getWorkoutList';
import {updateWorkout} from '../../routes/api/v1/workouts/updateWorkout';
import {upsertWorkouts} from '../../routes/api/v1/workouts/upsertWorkouts';
import {getArgusCheckinTypes} from '../../routes/api/v1/argus-checkins/getArgusCheckinTypes';

export const openApiRoutes: OpenApiRouteMap<ApiRouteType> = [
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
      upsertExercises,
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
      upsertWorkouts,
      deleteWorkout,
    ],
  },
  {
    path: '/weight',
    routes: [
      createWeight,
    ],
  },
  {
    path: '/argus',
    routes: [
      getArgusCheckins,
      getArgusCheckinTypes,
    ],
  },
];
