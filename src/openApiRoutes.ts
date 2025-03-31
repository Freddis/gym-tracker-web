import {deleteExercise} from './routes/api/v1/exercises/deleteExercise';
import {updateExercise} from './routes/api/v1/exercises/updateExercise';
import {getExercise} from './routes/api/v1/exercises/getExercise';
import {getEntryTypes} from './routes/api/v1/entries/getEntryTypes';
import {getExerciseList} from './routes/api/v1/exercises/getExerciseList';
import {createExercise} from './routes/api/v1/exercises/createExercise';
import {getEntries} from './routes/api/v1/entries/getEntries';
import {registerUser} from './routes/api/v1/auth/registerUser';
import {loginUser} from './routes/api/v1/auth/loginUser';
import {OpenApiRouteMap} from './server/services/OpenApiService/types/OpenApiRouteMap';

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
    path: '/entries',
    routes: [
      getEntries,
      getEntryTypes,
    ],
  },
];
