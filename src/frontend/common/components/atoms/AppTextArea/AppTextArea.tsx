import {FC, InputHTMLAttributes} from 'react';
import {cn} from '../../../utils/cn';

export interface AppTextAreaProps {
  children?: string;
  onChange?: InputHTMLAttributes<HTMLTextAreaElement> ['onChange'];
  value?: InputHTMLAttributes<HTMLTextAreaElement> ['value'];
  placeholder?: InputHTMLAttributes<HTMLTextAreaElement> ['placeholder'];
}
export const AppTextArea: FC<AppTextAreaProps> = (props) => {
  const className = cn(
    'h-full w-full bg-white p-3 bg-cavity border-in-cavity border-1 rounded-sm resize-none',
  );
  return (
    <textarea {...props} className={className} />
  );
};
