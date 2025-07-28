import {FC, ReactNode} from 'react';
import {Color} from '../../../enums/Color';
import {twMerge} from 'tailwind-merge';
import {FaCircleXmark} from 'react-icons/fa6';

interface AppToastProps {
  variant: Color.Warning | Color.Success | Color.Danger | Color.Info,
  children: string,
  className?: string
}
export const AppToast: FC<AppToastProps> = (props) => {
  const classes = `palette-${props.variant} flex items-center bg-main text-on-main py-3 px-5 rounded-sm min-w-100 text-left`;
  const iconMap: Record<typeof props['variant'], ReactNode> = {
    [Color.Danger]: <FaCircleXmark className="inline mr-2"/>,
    [Color.Warning]: null,
    [Color.Info]: null,
    [Color.Success]: null,
  };
  const icon = iconMap[props.variant];
  const parts = props.children.split('\n');
  return (
    <div className={twMerge(classes, props.className)}>
      <div>{icon}</div>
      <div className="flex flex-col grow">
        {parts.map((x) => <div key={x}>{x}</div>)}
      </div>
    </div>
  );
};
