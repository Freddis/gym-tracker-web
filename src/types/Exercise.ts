import {GetExercisesResponses} from 'src/lib/data/client/api';
import {ArrayElement} from './ArrayElement';

export type Exercise = ArrayElement<GetExercisesResponses['200']['items']>
