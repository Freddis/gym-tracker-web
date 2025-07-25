import {FC, HTMLAttributes} from 'react';
import {twMerge} from 'tailwind-merge';
import {EnumMap} from '../../../../common/types/EnumMap';
import {Color} from '../../../enums/Color';

type AppButtonProps = HTMLAttributes<HTMLButtonElement> & {variant?: 'md' | 'lg', palette?: Color };

export const AppButton: FC<AppButtonProps> = (props) => {
  const variant = props.variant ?? 'md';
  const color = props.palette ?? Color.Accent;
  const sizes : EnumMap<typeof props.variant, string[]> = {
    md: ['px-2', 'py-1', 'font-normal'],
    lg: ['px-3', 'py-2', 'uppercase'],
  };
  const classes = [
    `palette-${color}`,
    'bg-main',
    'text-on-main',
    ...sizes[variant],
  ];
  const className = twMerge('px-2 py-1 font-normal  rounded-sm cursor-pointer ', classes, props.className);
  return (
    <button {...props} className={className}>{props.children}</button>
  );
};
