import {ArrayElement} from 'src/common/types/ArrayElement';
import {GetWorkoutsByIdResponse} from '../openapi-client';

export type WorkoutExerciseWithSets = ArrayElement<GetWorkoutsByIdResponse['item']['exercises']>
