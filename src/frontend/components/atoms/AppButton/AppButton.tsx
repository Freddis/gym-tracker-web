import {FC, HTMLAttributes} from 'react';
import {twMerge} from 'tailwind-merge';

type AppButtonProps = HTMLAttributes<HTMLButtonElement> & {variant?: 'neutral' | 'accent' };

export const AppButton: FC<AppButtonProps> = (props) => {
  const neutral = ['bg-neutral-surface', 'text-on-neutral-surface'];
  const accent = ['bg-accent', 'text-white'];
  const classes = props.variant === 'neutral' ? neutral : accent;
  const className = twMerge('px-3 py-2 uppercase rounded-sm cursor-pointer', classes, props.className);
  return (
    <button {...props} className={className}>{props.children}</button>
  );
};
