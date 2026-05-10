import {FC, ReactNode} from 'react';

export const InputRow: FC<{children: ReactNode}> = (props) => {
  return (
    <div className="flex flex-col gap-2">
      {props.children}
    </div>
  );
};
