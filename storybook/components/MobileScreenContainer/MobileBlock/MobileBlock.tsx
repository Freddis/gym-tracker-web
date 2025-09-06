import {FC, ReactNode} from 'react';
import {AppBlock} from '../../../../src/frontend/components/atoms/AppBlock/AppBlock';

export const MobileBlock: FC<{children: ReactNode}> = ({children}) => <AppBlock className="p-3">{children}</AppBlock>;
