import React, {FC} from 'react';
import {FaCalendar, FaChevronLeft, FaDumbbell, FaGear} from 'react-icons/fa6';
import {cn} from '../../../src/frontend/utils/cn';

interface IphoneDisplayProps {
  title?: string; children: React.ReactNode
  tab?: 1 | 2 | 3
}

export const IphoneDisplay: FC<IphoneDisplayProps> = ({children, title, tab = 1}) => {
  return (
    <div
      className="flex flex-col relative mx-auto my-6 w-[393px] h-[852px]
      bg-main text-on-main rounded-[50px] border-[12px]
      border-black shadow-2xl overflow-hidden font-[system-ui
    ">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-black rounded-b-3xl z-30" />

      {/* Status bar */}
      <div className={
        cn(
          'top-0 w-full h-[47px] flex items-center justify-between px-4 text-[15px] font-semibold z-20',
          title ? 'bg-surface' : ''
        )}>
        <span>13:59</span>
        <div className="flex items-center gap-2">
          {/* Signal dots */}
          <div className="flex gap-0.5">
            <div className="w-1 h-1 rounded-full bg-black" />
            <div className="w-1 h-1 rounded-full bg-black" />
            <div className="w-1 h-1 rounded-full bg-black" />
          </div>
          <span>📶</span>
        </div>
      </div>

      {/* Content */}
      <div className="top-[47px] bottom-[83px] w-full h-full overflow-auto flex flex-col">
        {title && (
          <div
           className="relative w-full h-12 flex items-center justify-center
           border-b border-on-surface/15 text-[17px] font-semibold bg-surface z-10 pb-5">
            <FaChevronLeft className="text-accent text-lg absolute left-2" />
            {title}
          </div>
        )}
        <div className="grow overflow-scroll">
          {children}
        </div>
      </div>

      {/* Tab bar */}
      <div
        className="bottom-0 w-full h-[83px]
        bg-surface border-t border-on-surface/15 flex flex-col items-center
        justify-between pt-2 pb-2"
        >
        <div className="flex justify-around w-full text-xs text-on-surface/60">
          <div className={cn('flex flex-col items-center', tab === 1 ? 'text-on-surface' : '')}>
            <FaCalendar className="text-2xl "/>
            <span className="mt-1">Entries</span>
          </div>
          <div className={cn('flex flex-col items-center', tab === 2 ? 'text-on-surface' : '')}>
            <FaDumbbell className="text-2xl"/>
            <span className="mt-1">Exercises</span>
          </div>
          <div className={cn('flex flex-col items-center', tab === 3 ? 'text-on-surface' : '')}>
            <FaGear className="text-2xl"/>
            <span className="mt-1">Settings</span>
          </div>
        </div>

        {/* Home indicator */}
        <div className="w-32 h-1.5 rounded-full bg-gray-400" />
      </div>
    </div>
  );
};
