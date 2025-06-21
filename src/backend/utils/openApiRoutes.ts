import {deleteExercise} from '../../routes/api/v1/exercises/deleteExercise';
import {updateExercise} from '../../routes/api/v1/exercises/updateExercise';
import {getExercise} from '../../routes/api/v1/exercises/getExercise';
import {getArgusCheckinTypes} from '../../routes/api/v1/argus-checkins/getArgusCheckinTypes';
import {getExerciseList} from '../../routes/api/v1/exercises/getExerciseList';
import {createExercise} from '../../routes/api/v1/exercises/createExercise';
import {getArgusCheckins} from '../../routes/api/v1/argus-checkins/getArgusCheckins';
import {registerUser} from '../../routes/api/v1/auth/registerUser';
import {loginUser} from '../../routes/api/v1/auth/loginUser';
import {getWorkoutList} from '../../routes/api/v1/workouts/getWorkoutList';
import {getWorkout} from '../../routes/api/v1/workouts/getWorkout';
import {createWorkout} from '../../routes/api/v1/workouts/createWorkout';
import {deleteWorkout} from '../../routes/api/v1/workouts/deleteWorkout';
import {updateWorkout} from '../../routes/api/v1/workouts/updateWorkout';
import {upsertExercises} from 'src/routes/api/v1/exercises/upsertExercises';
import {upsertWorkouts} from 'src/routes/api/v1/workouts/upsertWorkouts';
import {createWeight} from '../../routes/api/v1/weight/createWeight';
import {OpenApiRouteMap} from 'strap-on-openapi';

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
