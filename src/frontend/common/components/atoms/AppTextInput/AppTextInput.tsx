import {FC, InputHTMLAttributes} from 'react';
import {cn} from '../../../utils/cn';

export const AppTextInput: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const className = cn(
    'h-10 w-full bg-white p-3 bg-cavity border-in-cavity border-1 rounded-sm',
    props.className
  );
  return (
    <input {...props} className={className} />
  );
};
