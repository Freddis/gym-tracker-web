import {FC} from 'react';

export const CoreConceptBlock: FC = () => {
  return (
    <div className="bg-neutral text-on-neutral justify-center p-20 flex">
      <div className="max-w-5xl ">
      <div className="text-center mb-20">
          <h2 className="text-2xl text-center uppercase mb-5">Let's get up close and personal</h2>
          <div className="border-b-2 border-accent w-100 mb-5 m-auto"></div>
          <p>There is a very good reason <span className="text-accent">Discipline</span> exists</p>
        </div>

        <div className="grid grid-cols-2">
          <div>
            <img src="/images/pages/home/kettlebells.jpg" />
          </div>
          <div className="px-10">
          {/* <h2 className="uppercase mb-10 text-center text-2xl"></h2> */}
          <p>
            Hey there, I'm Alex. I spent almost 10 years being a gym rat and once I found myself in a very unpleasant situation.
          </p>
          <p className="mt-10">
           My gym tracker Argus is on a verge of dying, I can't export my data for 10 years and everything that
          had been free at the begining is now under a pay wall.
          </p>
          <p className="mt-10">
            First I tried Hevy and found out it's blocked in my country.
            Then I tried Strong only to find out that it doesn't have export and charts are not available on free accounts.
          </p>
          <p className="mt-10 font-semibold">
          You see where I'm going with that? Someone has to stop this madness.
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};
