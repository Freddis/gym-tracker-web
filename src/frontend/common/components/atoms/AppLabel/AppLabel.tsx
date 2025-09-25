import {FC} from 'react';
import {cn} from '../../../utils/cn';

export const AppLabel: FC<{children: string | string[], className?: string}> = (props) => {
  return (
    <label className={cn('text-normal h-10 flex items-center line-height', props.className)}>{props.children}</label>
  );
};
