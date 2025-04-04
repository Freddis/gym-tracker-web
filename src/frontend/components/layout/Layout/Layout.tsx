import {HeadContent, Outlet} from '@tanstack/react-router';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {Scripts} from '@tanstack/react-start';
import {Header} from '../Header/Header';
import {CSSProperties, useEffect} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider} from '../AuthProvider/AuthProvider';
import {PopupProvider} from '../../atoms/Popup/PopupProvider';


const queryClient = new QueryClient();
export function Layout() {
  useEffect(() => {
    document.body.style.margin = '0px';
  });
  const bodyStyle: CSSProperties = {
    background: 'rgb(15, 18, 20)',
    color: 'white',
    fontFamily: 'Arial',
  };
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body style={bodyStyle}>
        <QueryClientProvider client={queryClient}>
          {/* <ThemeProvider theme={{}}> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <AuthProvider>
                <PopupProvider>
                  <Header/>
                  <Outlet />
                </PopupProvider>
              </AuthProvider>
            </LocalizationProvider>
          {/* </ThemeProvider> */}
          <Scripts />
        </QueryClientProvider>
      </body>
    </html>
  );
}
