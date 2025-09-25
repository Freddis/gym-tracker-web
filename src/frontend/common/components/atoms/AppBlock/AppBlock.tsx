import {FC, HTMLAttributes} from 'react';
import {cn} from '../../../utils/cn';

export const AppBlock: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const classes = cn('bg-surface text-on-surface p-5 rounded-md w-full shadow-md', props.className);
  return (
    <div {...props} className={classes}>
      {props.children}
    </div>
  );
};
