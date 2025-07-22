import {FC, ReactNode} from 'react';
import {twMerge} from 'tailwind-merge';

export const AppBlock: FC<{children: ReactNode | ReactNode[], className?: string}> = (props) => {
  const classes = twMerge('bg-surface text-on-surface p-5 mb-10 rounded-md w-full shadow-md', props.className);
  return (
    <div className={classes}>
      {props.children}
    </div>
  );
};
