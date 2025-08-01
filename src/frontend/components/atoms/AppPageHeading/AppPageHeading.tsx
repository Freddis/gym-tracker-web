import {FC} from 'react';

export const AppPageHeading: FC<{children: string}> = ({children}) => {
  return (
    <h1 className="text-xl">{children}</h1>
  );
};
