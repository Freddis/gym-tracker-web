import {FC} from 'react';
import {FaCircleXmark} from 'react-icons/fa6';
import {twMerge} from 'tailwind-merge';

export const AppInputError: FC<{error: string | null, className?: string}> = (props) => {
  const error = props.error ?? 'None';
  const visibility = props.error ? '' : 'invisible';
  const opacity = props.error ? 'opacity-100' : 'opacity-0';
  const classes = `palette-danger text-on-main duration-1000 
  transition-opacity mt-2 mb-2 flex items-center rounded-xs ${opacity} ${visibility}`;
  return (
    <div className={twMerge(classes, props.className)}>
      {props.error && <FaCircleXmark className="inline mr-2"/>}
      <span>{error}</span>
    </div>
  );
};
