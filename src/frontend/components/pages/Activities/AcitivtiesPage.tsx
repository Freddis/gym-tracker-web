import {FC} from 'react';
import {PageContainer} from '../../layout/PageContainer/PageContainer';
import {WorkoutBlock} from '../Workouts/WorkoutListPage/WorkoutBlock/WorkoutBlock';
import {Workout} from '../../../openapi-client';

const NewsBlock = () => (
  <div className="bg-neutral-surface text-on-neutral-surface flex flex-col shadow-neutral-shadow shadow-md rounded-md">
    <img className="h-100 w-full object-cover rounded-t-md" src="/images/pages/home/news2.jpg" />
    <div className="p-5 grow flex flex-col">
      <h3 className="uppercase mb-2 font-semibold">Gained 10 pounds in 3 months</h3>
      <p>
      10lbs of muscle after 50 is doable but to achieve it in a year will require a
        lot of hard work and discipline. My strategy will be to consult ...
        <span className="text-accent block">Read More</span>
        </p>
        <div className="grow flex flex-col-reverse">
          <div className="flex flex-row gap-5 items-center mt-10">
            <img className="w-8" src="/images/avatar.gif" />
            <span className="text-accent">Alex S.</span>
          </div>
        </div>
      </div>
  </div>
);
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
    <div className="bg-neutral">
      <div className="m-auto w-5xl max-w-full flex flex-row gap-5">
        <div className="w-60 bg-neutral-surface p-5 rounded-md">
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
