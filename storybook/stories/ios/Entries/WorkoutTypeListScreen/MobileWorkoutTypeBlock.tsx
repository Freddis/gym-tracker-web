import {FC} from 'react';
import {WorkoutType} from '../../../../../src/frontend/utils/openapi-client';
import {AppImage} from '../../../../../src/frontend/components/atoms/AppImage/AppImage';
import {AppLink} from '../../../../../src/frontend/components/atoms/AppLink/AppLink';
import {MobileBlock} from '../../../../components/MobileScreenContainer/MobileBlock/MobileBlock';

export const MobileWorkoutTypeBlock: FC<{item: WorkoutType}> = ({item}) => {
  return (
    <MobileBlock>
      <div className="flex flex-col sm:flex-row">
        <div className="text-base font-normal mb-2">
          <AppLink to="/workouts/types/update/$id" params={{id: item.id.toString()}}>{item.name}</AppLink>
        </div>
      </div>
       <div className="">
             {item.exercises.map((exercise, i) => (
              <>
              <div key={i} className="flex flex-row gap-3">
                <AppImage src={exercise.exercise.images[0]} className="mt-1 w-10 h-10 object-cover" />
                <div className="flex flex-col">
                  <b>{exercise.exercise.name}</b>
                  <div className="flex gap-2">
                    {exercise.sets.map((set, i) => (
                      <div key={i}>{i + 1}: {set.reps}{i < exercise.sets.length - 1 ? ',' : ''}</div>
                    ))}
                  </div>
                </div>
             </div>
              {i < item.exercises.length - 1 && <div key={`${i}sep`} className="border-b-1 border-on-surface/15 my-2" />}
              </>
             ))}
           </div>
    </MobileBlock>
  );
};
