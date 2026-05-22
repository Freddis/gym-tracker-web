import {HeadContent, Scripts, useMatchRoute} from '@tanstack/react-router';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider} from '../AuthProvider/AuthProvider';
import {ThemeProvider} from '../ThemeProvider/ThemeProvider';
import {StrictMode} from 'react';
import {LanguageProvider} from '../LanguageProvider/LanguageProvider';
import {CookieName} from '../../../types/CookieName';
import {ToastProvider} from '../../atoms/AppToast/ToastProvider';
import {PopupProvider} from '../../atoms/Popup/PopupProvider';
import {CrmLayout} from '../../../../crm/components/layout/CrmLayout/CrmLayout';
import {WebsiteLayout} from '../../../../website/components/layout/WebsiteLayout/WebsiteLayout';
import {APIProvider} from '@vis.gl/react-google-maps';
import {Chart} from 'chart.js';
import 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
Chart.register(annotationPlugin);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
    },
  },
});
export function Layout() {
  const match = useMatchRoute();
  const isCrm = match({
    to: '/crm',
    fuzzy: true,
  });
  const googleMapApiKey = 'AIzaSyAmmU4TJa4NHng7bnYZiiE5QZMeQJIk5zg';
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <LanguageProvider>
            <ThemeProvider useBodyContainer>
              <ToastProvider>
                <AuthProvider cookieName={isCrm ? CookieName.Manager : CookieName.User} sendLanguage={!isCrm}>
                  <PopupProvider>
                    <APIProvider apiKey={googleMapApiKey}>
                      <div className="flex min-h-screen flex-col font-extralight palette-neutral bg-main">
                        { isCrm ? <CrmLayout /> : <WebsiteLayout/>}
                      </div>
                    </APIProvider>
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
