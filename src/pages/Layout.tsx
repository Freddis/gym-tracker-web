import {HeadContent, Outlet} from '@tanstack/react-router';

import {Scripts} from '@tanstack/react-start';
import {Header} from '../components/Header/Header';
import {CSSProperties, useEffect} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
const queryClient = new QueryClient();
export function Layout() {
  useEffect(() => {
    document.body.style.margin = '0px';
  });
  const bodyStyle: CSSProperties = {
    background: 'rgb(15, 18, 20)',
    color: 'white',
  };
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body style={bodyStyle}>
        <QueryClientProvider client={queryClient}>
          <Header/>
          <Outlet />
          <Scripts />
        </QueryClientProvider>
      </body>
    </html>
  );
}
