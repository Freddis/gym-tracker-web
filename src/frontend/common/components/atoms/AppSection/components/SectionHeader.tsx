import {FC, ReactNode} from 'react';

export const SectionHeader: FC<{children: ReactNode}> = (props) => {
  return (
    <div className="text-lg grow font-semibold">
      {props.children}
    </div>
  );
};
