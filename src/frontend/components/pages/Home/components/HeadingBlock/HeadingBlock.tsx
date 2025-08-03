import {FC, ReactNode} from 'react';

export const HeadingBlock: FC<{title: ReactNode, children?:ReactNode}> = ({title, children}) => {
  const subtitle = children;
  return (
    <div className="max-w-5xl text-center mb-20 w-full">
        <h2 className="text-3xl uppercase mb-5">{title}</h2>
        {subtitle && <div className="border-b-2 border-accent w-100 max-w-full mb-5 m-auto"></div>}
        {subtitle && <p className="text-xl">{subtitle}</p>}
      </div>
  );
};
