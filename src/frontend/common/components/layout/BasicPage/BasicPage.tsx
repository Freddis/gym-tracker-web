import {FC, ReactNode} from 'react';

export const BasicPage: FC<{children: ReactNode| ReactNode[]}> = (props) => {
  return (
    <div className="flex flex-col max-w-5xl w-full">
      {props.children}
    </div>
  );
};
