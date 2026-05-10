import {FC, InputHTMLAttributes} from 'react';
import {cn} from '../../../utils/cn';

export interface AppTextInputProps {
  ['data-testid']?: string;
  hasError?: boolean;
  password?: boolean;
  onChange?: InputHTMLAttributes<HTMLInputElement> ['onChange'];
  value?: InputHTMLAttributes<HTMLInputElement> ['value'];
  placeholder?: InputHTMLAttributes<HTMLInputElement> ['placeholder'];
  centerText?: boolean;
  noAutoComplete?: boolean;
}
export const AppTextInput: FC<AppTextInputProps> = (props) => {
  const className = cn(
    'h-10 w-full bg-white p-3 bg-cavity border-in-cavity border-1 rounded-sm',
    props.centerText ? 'text-center' : undefined,
    props.hasError ? 'border-1 border-on-danger text-on-danger' : undefined
  );
  return (
    <input
      data-testid={props['data-testid']}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      className={className}
      type={props.password ? 'password' : 'text'}
      autoComplete={props.noAutoComplete ? 'new-password' : undefined}
    />
  );
};
