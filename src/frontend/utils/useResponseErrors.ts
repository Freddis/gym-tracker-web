import {useEffect, useState} from 'react';
import {useToasts} from '../components/atoms/AppToast/hooks/useToasts';
import {ApiErrorResponse} from '../types/ApiErrorResponse';
import {useAppPartialTranslation} from './i18n/useAppPartialTranslation';

export type FieldError = {
  field: string,
  message: string,
}
const selectPath = <T>(fn: (x: T) => unknown): string => {
  const accesses: string[] = [];
  const proxy = new Proxy({}, {
    get(_, prop) {
      accesses.push(String(prop));
      return proxy;
    },
  });
  fn(proxy as T);
  return accesses.join('.');
};
type BrandedWithType<T, TBrand> = T & {__brand: TBrand}
export type ErrorSlice<T extends object> = BrandedWithType<FieldError[], T>

export const useResponseErrors = <T extends object>(existingErrors?: FieldError[] | ErrorSlice<T>) => {
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
  const sliceErrors = <X extends object>(errors: FieldError[]| undefined, fn: (x: T) => X| undefined): ErrorSlice<X>|undefined => {
    if (!errors) {
      return undefined;
    }
    const path = selectPath(fn);
    if (path.length === 0) {
      return errors as ErrorSlice<X>;
    }
    const slice = errors.filter((x) => x.field.startsWith(path)).map((x) => ({
      ...x,
      field: x.field.substring(path.length + 1),
    }));
    return slice as ErrorSlice<X>;
  };
  const getSmartError = (fn: (x: T) => unknown): string | null => {
    const path = selectPath(fn);
    return getError(path);
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
  return {
    getError,
    getSmartError,
    setErrors: mySetErrors,
    sliceErrors,
    errors,
    showToastsAndSetErrors,
  } as const;
};
