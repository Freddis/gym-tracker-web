import {HeadContent, Outlet, Scripts} from '@tanstack/react-router';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {Header} from '../Header/Header';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider} from '../AuthProvider/AuthProvider';
import {PopupProvider} from '../../atoms/Popup/PopupProvider';
import {Footer} from '../Footer/Footer';
import {ThemeProvider} from '../ThemeProvider/ThemeProvider';

const queryClient = new QueryClient();
export function Layout() {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          </LocalizationProvider>
        </ThemeProvider>
        <Scripts />
      </QueryClientProvider>
    </html>
  );
}
