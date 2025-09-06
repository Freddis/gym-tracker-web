import {FC, ReactNode} from 'react';
import {cn} from '../../../src/frontend/utils/cn';

export const MobileScreenContainer: FC<{children: ReactNode, className?: string}> = ({children, className}) => (
  <div className={cn('p-3', className)}>
    {children}
  </div>
);
