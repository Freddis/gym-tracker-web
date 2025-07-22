import {FC} from 'react';
import {Color} from '../../../enums/Color';

interface AppToastProps {
  variant: Color.Warning | Color.Success | Color.Danger | Color.Info,
  children: string,
}
export const AppToast: FC<AppToastProps> = (props) => {
  return (
    <div className={`palette-${props.variant} bg-main text-on-main py-3 px-5 rounded-sm min-w-100 text-left`}>{props.children}</div>
  );
};
