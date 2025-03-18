import {ReactNode} from '@tanstack/react-router';
import {CSSProperties} from 'react';

export function PageContainer(props: {children: ReactNode | ReactNode[]}) {

  const style: CSSProperties = {
    padding: '20px',
    margin: '62.5px auto 0px',
    width: '1024px',
  };
  return <div style={style}>{props.children}</div>;
}
