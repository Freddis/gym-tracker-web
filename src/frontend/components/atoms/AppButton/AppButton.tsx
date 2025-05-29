import {FC, HTMLAttributes} from 'react';
import {twMerge} from 'tailwind-merge';
import {EnumMap} from '../../../../common/types/EnumMap';

type AppButtonProps = HTMLAttributes<HTMLButtonElement> & {variant?: 'md' | 'lg', palette?: 'neutral' | 'accent' };

export const AppButton: FC<AppButtonProps> = (props) => {
  const variant = props.variant ?? 'md';
  const palette = props.palette ?? 'accent';
  const colors: EnumMap<typeof props.palette, string[]> = {
    neutral: ['bg-neutral-surface', 'text-on-neutral-surface'],
    accent: ['bg-accent', 'text-white', 'hover:bg-red-500'],
  };
  const sizes : EnumMap<typeof props.variant, string[]> = {
    md: ['px-2', 'py-1', 'font-normal'],
    lg: ['px-3', 'py-2', 'uppercase'],
  };
  const classes = [...colors[palette], ...sizes[variant]];
  const className = twMerge('px-2 py-1 font-normal  rounded-sm cursor-pointer ', classes, props.className);
  return (
    <button {...props} className={className}>{props.children}</button>
  );
};
