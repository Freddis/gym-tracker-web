import {FC, HTMLAttributes} from 'react';
import {twMerge} from 'tailwind-merge';

type AppButtonProps = HTMLAttributes<HTMLButtonElement>;

export const AppButton: FC<AppButtonProps> = (props) => {
  const className = twMerge('bg-accent px-3 py-2  text-white uppercase rounded-sm cursor-pointer', props.className);
  return (
    <button {...props} className={className}>{props.children}</button>
  );
};
