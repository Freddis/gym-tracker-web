import {FC} from 'react';
import {GetExercisesBuiltInErrors} from '../../../openapi-client';
import {AppToast} from '../AppToast/AppToast';
import {Color} from '../../../enums/Color';

interface AppApiErrorDisplayProps {
  error?: GetExercisesBuiltInErrors['500']['error'] | GetExercisesBuiltInErrors['400']['error']
}

export const AppApiErrorDisplay: FC<AppApiErrorDisplayProps> = (props) => {
  let message = 'Unknown Error';
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
