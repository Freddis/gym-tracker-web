import {FC} from 'react';

export const LatestNews: FC = () => {
  return (
    <div className=" justify-center p-20 flex bg-neutral text-on-neutral">
      <div className="max-w-5xl">
        <h2 className="text-2xl text-center uppercase mb-10">Latest Blog Posts</h2>
        <div className="grid grid-cols-3 gap-10">
          <div className="bg-neutral-surface text-on-neutral-surface flex flex-col shadow-neutral-shadow shadow-2xl">
            <img className="h-45 w-full object-cover" src="/images/pages/home/news1.jpg"/>
            <div className="p-5 grow flex flex-col">
              <h3 className="uppercase mb-2 font-semibold">How to make incredible lats?</h3>
              <p>
                To forge a balanced physique, training your back muscles will be absolutely essential...
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
          <div className="bg-neutral-surface text-on-neutral-surface flex flex-col shadow-neutral-shadow shadow-2xl">
            <img className="h-45 w-full object-cover" src="/images/pages/home/news2.jpg"/>
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
          <div className="bg-neutral-surface text-on-neutral-surface flex flex-col shadow-neutral-shadow shadow-2xl">
            <img className="h-45 w-full object-cover" src="/images/pages/home/news3.jpg"/>
            <div className="p-5 grow flex flex-col">
              <h3 className="uppercase mb-2 font-semibold">Kettlebells: a gamechanger!</h3>
              <p>
              Maybe this post will motivate you to get started.
              Maybe it’ll save you some time, depending on your goals.
              Maybe it’ll steer...
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
        </div>
      </div>
    </div>
  );
};
