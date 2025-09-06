import {FC, ReactNode} from 'react';
import {AppBlock} from '../../../../src/frontend/components/atoms/AppBlock/AppBlock';
import {cn} from '../../../../src/frontend/utils/cn';

export const MobileBlock: FC<{children: ReactNode, className?: string}> = ({children, className}) => (
<AppBlock className={cn('p-3', className)}>{children}</AppBlock>
);
