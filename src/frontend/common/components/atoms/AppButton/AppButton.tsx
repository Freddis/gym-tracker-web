import {ButtonHTMLAttributes, FC} from 'react';
import {EnumMap} from '../../../../../backend/types/EnumMap';
import {Color} from '../../../utils/design-system/types/Color';
import {cn} from '../../../utils/cn';

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {variant?: 'md' | 'lg', palette?: Color };

export const AppButton: FC<AppButtonProps> = (props) => {
  const variant = props.variant ?? 'md';
  const color = props.palette ?? Color.Accent;
  const sizes : EnumMap<typeof props.variant, string[]> = {
    md: ['px-2', 'py-1', 'font-normal'],
    lg: ['px-3', 'py-2', ''],
  };
  const classes = [
    `palette-${color}`,
    'bg-main',
    'text-on-main',
    ...sizes[variant],
    props.disabled ? 'opacity-50 cursor-not-allowed' : '',
  ];
  const className = cn('px-2 py-1 font-normal rounded-sm cursor-pointer inline-flex flex-row items-center gap-2', classes, props.className);
  return (
    <button {...props} className={className}>{props.children}</button>
  );
};
