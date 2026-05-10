import {FC, ReactNode} from 'react';

export const SectionContent: FC<{children: ReactNode}> = (props) => {
  return (
    <div className="flex flex-col gap-1">
      {props.children}
    </div>
  );
};
