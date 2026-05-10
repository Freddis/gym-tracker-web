import {FC} from 'react';

export const InputLabel: FC<{children: string}> = (props) => {
  return (
    <div>
      {props.children}
    </div>
  );
};
