import {ErrorComponentProps} from '@tanstack/react-router';
import {FC} from 'react';

export const ErrorPage: FC<ErrorComponentProps> = (props) => {
  return (
    <html>
      <body>
        {props.error.message}
      </body>
      </html>
  );
};
