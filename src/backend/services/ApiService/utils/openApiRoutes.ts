import {OpenApiRouteMap} from 'snap-on-openapi';
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
import {getEntryList} from '../api/entries/getEntryList';
import {getUserList} from '../api/users/getUserList';
import {loginManager} from '../api/auth/loginManager';
import {getOwnEntryList} from '../api/entries/getOwnEntryList';
import {getWeight} from '../api/weight/getWeight';
import {updateWeight} from '../api/weight/updateWeight';
import {getWorkoutPlanList} from '../api/workoutPlans/getWorkoutPlanList';
import {getWorkoutPlan} from '../api/workoutPlans/getWorkoutPlan';
import {createWorkoutPlan} from '../api/workoutPlans/createWorkoutPlan';
import {updateWorkoutPlan} from '../api/workoutPlans/updateWorkoutPlan';
import {deleteWorkoutPlan} from '../api/workoutPlans/deleteWorkoutPlan';
import {getWorkoutTypeList} from '../api/workoutTypes/getWorkoutTypeList';
import {deleteWorkoutType} from '../api/workoutTypes/deleteWorkoutType';
import {createWorkoutType} from '../api/workoutTypes/createWorkoutType';
import {getWorkoutType} from '../api/workoutTypes/getWorkoutType';
import {updateWorkoutType} from '../api/workoutTypes/updateWorkoutType';
import {getManagerList} from '../api/managers/getManagerList';
import {getTranslationList} from '../api/translations/getTranslationList';
import {getTranslation} from '../api/translations/getTranslation';
import {updateTranslation} from '../api/translations/updateTranslation';
import {getManagedExerciseList} from '../api/exercises/managed-exercises/getManagedExerciseList';
import {getManagedExercise} from '../api/exercises/managed-exercises/getManagedExercise';
import {updateManagedExercise} from '../api/exercises/managed-exercises/updateManagedExercise';
import {getManagedImages} from '../api/images/managed-images/getManagedImages';
import {deleteManagedImage} from '../api/images/managed-images/deleteManagedImage';
import {passwordResetStart} from '../api/auth/passwordResetStart';
import {passwordResetComplete} from '../api/auth/passwordResetComplete';
import {upsertEntries} from '../api/entries/upsertEntries';
import {deleteEntry} from '../api/entries/deleteEntry';
import {getEntry} from '../api/entries/getEntry';
import {createPost} from '../api/posts/createPost';
import {getPost} from '../api/posts/getPost';
import {updatePost} from '../api/posts/updatePost';
import {getOwnEntryDates} from '../api/entries/getOwnEntryDates';
import {upsertFood} from '../api/food/upsertFood';
import {getFoodList} from '../api/food/getFoodList';
import {getFood} from '../api/food/getFood';
import {changePassword} from '../api/auth/changePassword';
import {getSettings} from '../api/settings/getSettings';
import {updateSettings} from '../api/settings/updateSettings';

export const openApiRoutes: OpenApiRouteMap<ApiRouteType> = {
  '/auth': [
    registerUser,
    loginUser,
    passwordResetStart,
    passwordResetComplete,
    changePassword,
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
  '/workout-plans': [
    createWorkoutPlan,
    getWorkoutPlan,
    getWorkoutPlanList,
    updateWorkoutPlan,
    deleteWorkoutPlan,
  ],
  '/workout-types': [
    createWorkoutType,
    getWorkoutType,
    getWorkoutTypeList,
    updateWorkoutType,
    deleteWorkoutType,
  ],
  '/weight': [
    createWeight,
    getWeight,
    updateWeight,
  ],
  '/argus': [
    getArgusCheckins,
    getArgusCheckinTypes,
  ],
  '/entries': [
    getOwnEntryList,
    getEntry,
    getEntryList,
    upsertEntries,
    deleteEntry,
    getOwnEntryDates,
  ],
  '/posts': [
    createPost,
    getPost,
    updatePost,
  ],
  '/food': [
    upsertFood,
    getFood,
    getFoodList,
  ],
  '/settings': [
    getSettings,
    updateSettings,
  ],
  '/crm/users': [
    getUserList,
  ],
  '/crm/managers': [
    getManagerList,
  ],
  '/crm/auth': [
    loginManager,
  ],
  '/crm/translations': [
    getTranslation,
    getTranslationList,
    updateTranslation,
  ],
  '/crm/exercises': [
    getManagedExercise,
    getManagedExerciseList,
    updateManagedExercise,
  ],
  '/crm/images': [
    getManagedImages,
    deleteManagedImage,
  ],
};
