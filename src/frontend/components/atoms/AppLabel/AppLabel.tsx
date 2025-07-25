import {FC} from 'react';
import {twMerge} from 'tailwind-merge';

export const AppLabel: FC<{children: string | string[], className?: string}> = (props) => {
  return (
    <label className={twMerge('text-lg ', props.className)}>{props.children}</label>
  );
};
