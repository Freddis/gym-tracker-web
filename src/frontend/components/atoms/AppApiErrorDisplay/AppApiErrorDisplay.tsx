import {FC} from 'react';
import {GetExercisesBuiltInError, GetWorkoutsError} from '../../../openapi-client';
import {AppToast} from '../AppToast/AppToast';
import {Color} from '../../../enums/Color';

interface AppApiErrorDisplayProps {
  error?: GetExercisesBuiltInError['error'] | GetWorkoutsError['error']
}

export const AppApiErrorDisplay: FC<AppApiErrorDisplayProps> = (props) => {
  let message = [
    'Looks like we have an unexpected error on the server. Please reach our support and we will fix it.',
  ].join('\n');
  if (props.error && props.error.code === 'ActionError') {
    message = props.error.humanReadable;
  }
  if (props.error && props.error.code === 'ValidationFailed') {
    const lines: string[] = [
      'Validation errors in API request:',
    ];
    for (const err of props.error.fieldErrors) {
      if (!err.field) {
        lines.push(err.message);
        continue;
      }
      lines.push(`${err.field}: ${err.message}`);
    }
    message = lines.join('\n');
  }
  return (
    <AppToast variant={Color.Danger}>{message}</AppToast>
  );
};
