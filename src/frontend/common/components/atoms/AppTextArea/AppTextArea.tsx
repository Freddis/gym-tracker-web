import {FC, InputHTMLAttributes} from 'react';
import {cn} from '../../../utils/cn';

export const AppTextArea: FC<InputHTMLAttributes<HTMLTextAreaElement>> = (props) => {
  const className = cn(
    'h-10 w-full bg-white p-3 bg-cavity border-in-cavity border-1 rounded-sm',
    props.className
  );
  return (
    <textarea {...props} className={className} />
  );
};
