import {FC, HTMLAttributes} from 'react';
import {twMerge} from 'tailwind-merge';

type AppButtonProps = HTMLAttributes<HTMLButtonElement> & {variant?: 'neutral' | 'accent' };

export const AppButton: FC<AppButtonProps> = (props) => {
  const neutral = ['bg-neutral-surface', 'text-on-neutral-surface'];
  const accent = ['bg-accent', 'text-white'];
  const classes = props.variant === 'neutral' ? neutral : accent;
  const className = twMerge('px-2 py-1 font-normal  rounded-sm cursor-pointer hover:bg-red-500', classes, props.className);
  return (
    <button {...props} className={className}>{props.children}</button>
  );
};
