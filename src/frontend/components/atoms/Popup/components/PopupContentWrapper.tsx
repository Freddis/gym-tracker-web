import {FC, HTMLAttributes} from 'react';

export const PopupContentWrapper: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div {...props} className="rounded-sm palette-neutral bg-surface text-on-surface p-5">{props.children}</div>
  );
};
