import {useEffect, useState} from 'react';
import {useToasts} from '../components/atoms/AppToast/hooks/useToasts';
import {ApiErrorResponse} from '../types/ApiErrorResponse';
import {useAppPartialTranslation} from './i18n/useAppPartialTranslation';

export type FieldError = {
  field: string,
  message: string,
}

export const useResponseErrors = (existingErrors?: FieldError[]) => {
  const [errors, setErrors] = useState(existingErrors ?? []);
  const {translations} = useAppPartialTranslation((x) => x.pages.auth.login);
  const toasts = useToasts();
  useEffect(() => {
    if (!existingErrors) {
      return;
    }
    setErrors(existingErrors);
  }, [existingErrors]);
  const getError = (field: string): string | null => {
    for (const err of errors) {
      if (err.field === field) {
        return err.message;
      }
    }
    return null;
  };
  const mySetErrors = (e: FieldError[]) => {
    setErrors(e);
  };

  const showToastsAndSetErrors = <T extends {error?: ApiErrorResponse}>(
    data: T,
    opts?: {
      noValidationToasts: boolean
    }
  ): data is T & {error: ApiErrorResponse} => {
    if (!data?.error) {
      return false;
    }

    if (data.error.error.code === 'ValidationFailed') {
      setErrors(data.error.error.fieldErrors ?? []);
      if (!opts?.noValidationToasts) {
        toasts.addDanger(translations.utils.toasts.invalidForm);
      }
    } else if (data.error.error.code === 'ActionError') {
      toasts.addDanger(data.error.error.humanReadable);
    } else {
      toasts.addDanger(translations.utils.toasts.unknownApiError);
    }
    return true;
  };
  return {getError, setErrors: mySetErrors, errors, showToastsAndSetErrors} as const;
};
