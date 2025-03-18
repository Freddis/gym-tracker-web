import {CSSProperties} from 'react';
import {PageContainer} from '../components/PageContainer/PageContainer';

export function NotFoundPage() {
  const style: CSSProperties = {
    marginTop: '62.5px',
    margin: '62.5px auto 0px',
    width: '1024px',
  };
  return (
    <PageContainer>
      <div style={style}>
        <h1>404 Page not found</h1>
        <p>This page doesn't exist. If that's a mistake, please let us know and we'll fix it.</p>
      </div>
    </PageContainer>
  );
}
