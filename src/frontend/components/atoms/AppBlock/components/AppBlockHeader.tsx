import {FC} from 'react';
import {cn} from '../../../../utils/cn';

export const AppBlockHeader: FC<{children: string, className?: string}> = (props) => {
  return (
    <h1 className={cn('text-center not-prose text-xl mb-5', props.className)}>{props.children}</h1>
  );
};
