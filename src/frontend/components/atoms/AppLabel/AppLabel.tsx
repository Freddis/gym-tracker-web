import {FC} from 'react';

export const AppLabel: FC<{children: string | string[]}> = (props) => {
  return (
    <label className="text-lg ">{props.children}</label>
  );
};
