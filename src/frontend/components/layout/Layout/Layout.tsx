import {HeadContent, Outlet, Scripts} from '@tanstack/react-router';
import {Header} from '../Header/Header';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider} from '../AuthProvider/AuthProvider';
import {PopupProvider} from '../../atoms/Popup/PopupProvider';
import {Footer} from '../Footer/Footer';
import {ThemeProvider} from '../ThemeProvider/ThemeProvider';
import {StrictMode} from 'react';
import {LanguageProvider} from '../LanguageProvider/LanguageProvider';
import {ToastProvider} from '../../atoms/AppToast/ToastProvider';

const queryClient = new QueryClient();
export function Layout() {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <LanguageProvider>
            <ThemeProvider>
              <ToastProvider>
                <AuthProvider>
                  <PopupProvider>
                    <div className="flex min-h-screen flex-col font-extralight palette-neutral bg-main">
                      <Header/>
                      <div className="flex flex-col grow">
                        <Outlet />
                      </div>
                      <Footer />
                    </div>
                  </PopupProvider>
                </AuthProvider>
              </ToastProvider>
              <Scripts />
            </ThemeProvider>
          </LanguageProvider>
        </QueryClientProvider>
      </StrictMode>
    </html>
  );
}
