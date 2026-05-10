import {FC} from 'react';
import {FaCircleXmark} from 'react-icons/fa6';
import {cn} from '../../../utils/cn';

export const AppInputError: FC<{error: string | null, className?: string}> = (props) => {
  const error = props.error ?? 'None';
  const visibility = props.error != null ? '' : 'invisible';
  const opacity = props.error != null ? 'opacity-100' : 'opacity-0';
  const classes = `palette-danger text-on-main duration-1000 
  transition-opacity mt-0 mb-0 flex items-center rounded-xs ${opacity} ${visibility}`;
  return (
    <div {...props} className={cn(classes, props.className)}>
      {props.error != null && <FaCircleXmark className="inline mr-2"/>}
      <span>{error}</span>
    </div>
  );
};
