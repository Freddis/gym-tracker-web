import {FC} from 'react';

export const AppPageHeading: FC<{children: string, 'data-testid'?: string}> = (props) => {
  return (
    <h1 data-testid={props['data-testid']} className="text-xl h-8">{props.children}</h1>
  );
};
