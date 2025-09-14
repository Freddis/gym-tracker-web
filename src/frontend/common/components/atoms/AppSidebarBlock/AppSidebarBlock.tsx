import {FC, ReactNode} from 'react';
import {AppBlock} from '../AppBlock/AppBlock';
import {cn} from '../../../utils/cn';


export const AppSidebarBlock: FC<{className?: string, children: ReactNode | ReactNode[] }> = ({className, children}) => {

  return (
    <AppBlock className={cn('w-full md:w-80 lg:w-100', className)}>{children}</AppBlock>
  );

};
