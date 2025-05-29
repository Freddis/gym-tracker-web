import {FC} from 'react';

export const AppBlockHeader: FC<{children: string}> = (props) => {
  return (
    <h1 className="text-center text-xl mb-5">{props.children}</h1>
  );
};
