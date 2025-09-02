import {FC} from 'react';
import {WorkoutType} from '../../../utils/openapi-client';
import {AppBlock} from '../../atoms/AppBlock/AppBlock';
import {AppLink} from '../../atoms/AppLink/AppLink';
import {AppImage} from '../../atoms/AppImage/AppImage';

export const WorkoutTypeBlock: FC<{item: WorkoutType}> = ({item}) => {
  console.log(item);
  return (
    <AppBlock>
      <div className="flex flex-col sm:flex-row">
        <div className="text-lg font-normal mb-5">
          <AppLink to="/workouts/types/update/$id" params={{id: item.id.toString()}}>{item.name}</AppLink>
        </div>
      </div>
       <div className="mt-5">
             {item.exercises.map((exercise, i) => (
               <div key={i} className="flex flex-row">
               <AppImage src={exercise.exercise.images[0]} className="mt-1 min-w-20" />
               <div className="pl-5">
                 <b>{exercise.exercise.name}</b>
                 <div className="pb-3">
                   {exercise.sets.map((set, i) => (
                     <div key={i}>{i + 1}:{set.reps}</div>
                   ))}
                 </div>
               </div>
             </div>
             ))}
           </div>
    </AppBlock>
  );
};
