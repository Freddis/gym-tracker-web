import {FC, HTMLAttributes} from 'react';

export const PopupContentWrapper: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div className="rounded-sm bg-neutral-surface text-on-neutral-surface p-5">{props.children}</div>
  );
};
