import {FC} from 'react';
import {AppButton} from 'src/frontend/components/atoms/AppButton/AppButton';

export const HeroBlock: FC = () => {
  const imgUrl = '/images/pages/home/hero-1.jpg';
  const backgroundImage = `url(${imgUrl})`;
  return (
      <div style={{backgroundImage}} className="h-180 bg-cover">
        <div className="bg-black/50 w-full h-full flex items-center justify-center">
            <div className="mb-10 text-center">
              <h1 className="text-white text-4xl uppercase">
                <span className="text-accent">Discipline.</span>
                <span> the way to achieve your </span>
                <span className="text-accent">goals</span>
              </h1>
              <p className="text-white text-lg mt-5">
                In sports and fitness you don't get far if you can't track your progress.
                Dicsipline tracker is your trustworthy companion.
              </p>
              <AppButton className="mt-10">Download App</AppButton>
            </div>
        </div>
      </div>
  );
};
