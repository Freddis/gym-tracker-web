import {ErrorComponentProps} from '@tanstack/react-router';
import {FC} from 'react';
import appCss from '../../../../common/utils/css/app.css?url';
import {ThemeProvider} from '../../../../common/components/layout/ThemeProvider/ThemeProvider';
import {ErrorPagePresenter} from './components/ErrorPagePresenter';
import {LanguageProvider} from '../../../../common/components/layout/LanguageProvider/LanguageProvider';

export const ErrorPage: FC<ErrorComponentProps> = (props) => {
  // Need to use as little modules as possible not to trigger error again
  // Decided to risk here and include ThemeProvider
  return (
    <html>
      <head>
        <link rel="stylesheet" href={appCss} />
      </head>
      <ThemeProvider>
        <LanguageProvider>
          <ErrorPagePresenter {...props} />
        </LanguageProvider>
      </ThemeProvider>
    </html>
  );
};
