import {FC} from 'react';

export const AppPageHeading: FC<{children: string}> = (props) => {
  return (
    <h1 data-testid={'page-heading'} className="text-xl h-8">{props.children}</h1>
  );
};
