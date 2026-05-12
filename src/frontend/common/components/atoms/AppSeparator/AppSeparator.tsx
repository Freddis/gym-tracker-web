import {FC} from 'react';
import {cn} from '../../../utils/cn';

export const AppSeparator: FC<{noMargin?: boolean}> = (props) => {
  const {noMargin} = props;
  return (
    <div className={cn('border-b-1 border-neutral-on-surface', noMargin ? '' : 'mt-5 mb-5')} />
  );
};
