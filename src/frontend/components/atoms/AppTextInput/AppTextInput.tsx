import {FC, InputHTMLAttributes} from 'react';
import {twMerge} from 'tailwind-merge';

export const AppTextInput: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const className = twMerge(
    'h-10 w-full bg-white p-3 bg-cavity border-in-cavity border-1 rounded-xs',
    props.className
  );
  return (
    <input {...props} className={className} />
  );
};
