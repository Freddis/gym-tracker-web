import {HeadContent, Outlet, Scripts} from '@tanstack/react-router';
import {Header} from '../Header/Header';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider} from '../AuthProvider/AuthProvider';
import {PopupProvider} from '../../atoms/Popup/PopupProvider';
import {Footer} from '../Footer/Footer';
import {ThemeProvider} from '../ThemeProvider/ThemeProvider';
import {StrictMode} from 'react';

const queryClient = new QueryClient();
export function Layout() {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <AuthProvider>
                <PopupProvider>
                  <div className="flex flex-col h-screen">
                    <Header/>
                    <div className="grow">
                    <Outlet />
                    </div>
                    <Footer />
                  </div>
                </PopupProvider>
            </AuthProvider>
            <Scripts />
          </ThemeProvider>
        </QueryClientProvider>
      </StrictMode>
    </html>
  );
}
