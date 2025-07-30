/* eslint-disable max-len */
import * as SwitchPrimitive from '@radix-ui/react-switch';
import {cn} from '../../../utils/cn';
import {ComponentProps, createRef, FC} from 'react';
import {Color} from '../../../utils/design-system/types/Color';

export interface SwitchProps extends ComponentProps<typeof SwitchPrimitive.Root> {
  label?: string,
  color?: Color
}
export const AppSwitch: FC<SwitchProps> = ({className, label, ...props}) => {
  const ref = createRef<HTMLButtonElement>();
  const click = () => {
    ref.current?.click();
  };
  return (
    <div className="flex flex-row items-center">
    <SwitchPrimitive.Root
      ref={ref}
      data-slot="switch"
      className={cn(
        'peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        'cursor-pointer',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0'
        )}
      />
    </SwitchPrimitive.Root>
    {label && <label className="ml-5 cursor-pointer" htmlFor={props.id} onClick={click}>{label}</label>}
    </div>
  );
};
