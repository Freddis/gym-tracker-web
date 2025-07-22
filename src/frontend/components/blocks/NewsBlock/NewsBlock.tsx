import {FC} from 'react';

export const NewsBlock: FC = () => (
  <div className="bg-surface text-on-surface flex flex-col shadow-neutral-shadow shadow-md rounded-md">
    <img className="h-50 md:h-100 w-full object-cover rounded-t-md" src="/images/pages/home/news2.jpg" />
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
