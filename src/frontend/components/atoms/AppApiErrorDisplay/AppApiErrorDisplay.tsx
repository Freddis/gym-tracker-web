import {FC} from 'react';
import {AppToast} from '../AppToast/AppToast';
import {Color} from '../../../utils/design-system/types/Color';
import {GetExercisesBuiltInError, GetExercisesError, GetWorkoutsError} from '../../../utils/openapi-client';
import {useAppPartialTranslation} from '../../../utils/i18n/useAppPartialTranslation';

interface AppApiErrorDisplayProps {
  error: GetExercisesBuiltInError['error'] | GetWorkoutsError['error'] | GetExercisesError['error'] | undefined
}

export const AppApiErrorDisplay: FC<AppApiErrorDisplayProps> = (props) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.components.errorDisplay);
  let message = t(i18n.Unknown);
  if (props.error && props.error.code === 'ActionError') {
    message = props.error.humanReadable;
  }
  if (props.error && props.error.code === 'NotFound') {
    message = t(i18n.NotFound);
  }
  if (props.error && props.error.code === 'Unauthorized') {
    message = t(i18n.Unauthorized);
  }
  if (props.error && props.error.code === 'ValidationFailed') {
    const lines: string[] = [
      t(i18n.ValidationFailed),
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
