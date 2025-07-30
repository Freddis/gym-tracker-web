import {FC} from 'react';
import {PageContainer} from '../../layout/PageContainer/PageContainer';
import {WorkoutBlock} from '../Workouts/WorkoutListPage/WorkoutBlock/WorkoutBlock';
import {NewsBlock} from '../../blocks/NewsBlock/NewsBlock';
import {Workout} from '../../../utils/openapi-client';

export const ActivityPage: FC = () => {

  const workout: Workout = {
    id: 0,
    typeId: null,
    userId: 0,
    calories: 100,
    start: new Date(new Date().getTime() - 1000 * 60 * 15.33),
    end: new Date(),
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    exercises: [],
  };
  const types = [
    'Workouts',
    'Activities',
    'Blog Posts',
    'Weight',
  ];
  return (
  <PageContainer>
    <div className="bg-main">
      <div className="m-auto w-5xl max-w-full flex flex-row gap-5">
        <div className="w-60 bg-surface p-5 rounded-md">
          <h3 className="font-normal mb-2">Entry type:</h3>
          {types.map((x) => (
            <div className="mb-2">
             <input type="checkbox" />
             <span className="ml-2">{x}</span>
           </div>
          ))}
          <div className="border-b-1 border-accent mb-5"></div>
          <div className="mb-2">
            <input type="checkbox" />
            <span className="ml-2">Friends Only</span>
          </div>
        </div>
        <div className="grow flex flex-col gap-10">
          <NewsBlock />
          <WorkoutBlock item={workout}/>
        </div>
      </div>
    </div>
  </PageContainer>
  );
};
