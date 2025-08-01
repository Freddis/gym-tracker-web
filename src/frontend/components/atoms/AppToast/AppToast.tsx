import {FC, ReactNode} from 'react';
import {Color} from '../../../utils/design-system/types/Color';
import {twMerge} from 'tailwind-merge';
import {FaCircleXmark} from 'react-icons/fa6';
import {FaCheck, FaExclamationTriangle, FaInfo} from 'react-icons/fa';
import {ToastColor} from './types/ToastColor';

interface AppToastProps {
  variant: ToastColor
  children: string,
  className?: string
}
export const AppToast: FC<AppToastProps> = (props) => {
  const classes = `palette-${props.variant} flex items-center bg-main text-on-main py-3 px-5 rounded-sm min-w-100 text-left`;
  const iconMap: Record<typeof props['variant'], ReactNode> = {
    [Color.Danger]: <FaCircleXmark className="inline mr-2 -mt-0.5"/>,
    [Color.Warning]: <FaExclamationTriangle className="inline mr-2 -mt-0.5"/>,
    [Color.Info]: <FaInfo className="inline mr-2 -mt-0.5"/>,
    [Color.Success]: <FaCheck className="inline mr-2 -mt-0.5"/>,
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
