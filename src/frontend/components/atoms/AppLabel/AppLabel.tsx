import {FC} from 'react';

export const AppLabel: FC<{children: string | string[]}> = (props) => {
  return (
    <label className="mt-3 text-lg ">{props.children}</label>
  );
};
