import {ErrorComponentProps} from '@tanstack/react-router';
import {FC} from 'react';

export const ErrorPage: FC<ErrorComponentProps> = (props) => {
  // todo: delete this before release
  console.log(props.error);
  return (
    <html>
      <body>
        {props.error.message}
      </body>
      </html>
  );
};
