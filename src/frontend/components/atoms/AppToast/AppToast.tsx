import {FC} from 'react';
import {PaletteName} from '../../../enums/PaletteName';
import {twMerge} from 'tailwind-merge';
import {getTwClasses} from '../../../utils/getTwClasses';

interface AppToastProps {
  variant: PaletteName
  children: string,
}
export const AppToast: FC<AppToastProps> = (props) => {
  return (
    <div className={twMerge(getTwClasses(props.variant), 'py-3 px-5 rounded-sm min-w-100 text-left')}>{props.children}</div>
  );
};
