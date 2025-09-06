import {FC, ReactNode} from 'react';

export const MobileScreenContainer: FC<{children: ReactNode}> = ({children}) => (
  <div className="p-3">
    {children}
  </div>
);
