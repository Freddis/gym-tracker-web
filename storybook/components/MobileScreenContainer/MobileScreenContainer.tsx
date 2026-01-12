import {FC, ReactNode} from 'react';
import {cn} from '../../../src/frontend/common/utils/cn';

export const MobileScreenContainer: FC<{children: ReactNode, className?: string}> = ({children, className}) => (
  <div className={cn('px-3 pt-3 min-h-full', className)}>
    {children}
  </div>
);
