import {FC, Fragment} from 'react';
import {WorkoutType} from '../../../utils/openapi-client';
import {AppBlock} from '../../atoms/AppBlock/AppBlock';
import {RouteLink} from '../../atoms/RouteLink/RouteLink';
import {AppImage} from '../../atoms/AppImage/AppImage';
import {route, RouteId} from '../../../utils/route';

export const WorkoutTypeBlock: FC<{item: WorkoutType}> = ({item}) => {
  return (
    <AppBlock>
      <div className="flex flex-col sm:flex-row">
        <div className="text-lg font-normal mb-5">
          <RouteLink to={route(RouteId.WorkoutTypeUpdate)} params={{id: item.id.toString()}}>{item.name}</RouteLink>
        </div>
      </div>
       <div className="">
             {item.exercises.map((exercise, i) => (
              <Fragment key={i}>
                <div className="flex flex-row gap-3">
                  <AppImage src={exercise.exercise.images[0]} className="mt-1 w-15 h-15 object-cover" />
                  <div className="flex flex-col">
                    <b>{exercise.exercise.name}</b>
                    <div className="pb-3 flex gap-2">
                      {exercise.sets.map((set, i) => (
                        <div key={i}>{i + 1}:{set.reps}</div>
                      ))}
                    </div>
                  </div>
                </div>
                {i < item.exercises.length - 1 && <div key={`${i}sep`} className="border-b-1 border-on-surface/15 my-2" />}
              </Fragment>
             ))}
           </div>
    </AppBlock>
  );
};
