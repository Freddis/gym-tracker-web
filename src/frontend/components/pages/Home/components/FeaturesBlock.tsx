import {FC} from 'react';
import {IoFastFood} from 'react-icons/io5';
import {FaDumbbell} from 'react-icons/fa';
import {MdOutlineSportsHandball} from 'react-icons/md';
import {GrAnalytics} from 'react-icons/gr';

export const FeaturesBlock: FC = () => {
  return (
    <div className="justify-center p-20 flex bg-lightest text-on-lightest">
      <div className="max-w-5xl text-center">
        <h2 className="text-2xl uppercase">What is <span className="text-accent">discipline?</span></h2>
        <div className="flex flex-row space-x-10 mt-10">
          <div>
            <FaDumbbell size={60} className="inline-block" />
            <h3 className="text-accent uppercase mt-2">Gym Workout Tracking</h3>
            <p>Track your workouts and progress.
              Built-in library contrains over 2000 exercises and you can tweak them as you like and create your own.</p>
          </div>
          <div>
            <IoFastFood size={60} className="inline-block" />
            <h3 className="text-accent uppercase mt-2">Calorie Tracking</h3>
            <p>Track calories, macros & more.
              Log even faster with tools like barcode scan & the NEW voice log.</p>
          </div>
          <div>
            <MdOutlineSportsHandball size={60} className="inline-block" />
            <h3 className="text-accent uppercase mt-2">Activity Tracking</h3>
            <p>Track your running, cycling, swimming and hiking.
              Add your own activities to calculate calorie expendure and progress.</p>
          </div>
          <div>
            <GrAnalytics size={60} className="inline-block" />
            <h3 className="text-accent uppercase mt-2">Analytics</h3>
            <p>
              Observe your progress with our analytics. History, charts, body measurements.
              Set up your goals and see your pace towards them.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
