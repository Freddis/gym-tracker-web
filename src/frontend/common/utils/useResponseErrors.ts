import {useEffect, useState} from 'react';
import {useToasts} from '../components/atoms/AppToast/hooks/useToasts';
import {useAppPartialTranslation} from '../../website/utils/i18n/useAppPartialTranslation';
import {ApiErrorResponse} from '../types/ApiErrorResponse';

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
export type ErrorSlice<T extends object| undefined> = BrandedWithType<FieldError[], Exclude<T, undefined>>

export const useResponseErrors = <T extends object | undefined>(existingErrors?: FieldError[] | ErrorSlice<Exclude<T, undefined>>) => {
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
  const hasSmartError = (fn: (x: T) => unknown): boolean => {
    const path = selectPath(fn);
    return errors.some((x) => x.field === path);
  };
  const setSmartError = (fn: (x: T) => unknown, error: string) => {
    const path = selectPath(fn);
    setErrors((x) => [...x, {field: path, message: error}]);
  };
  const clearSmartError = (fn: (x: T) => unknown) => {
    const path = selectPath(fn);
    setErrors(errors.filter((x) => x.field !== path));
  };
  const clearErrors = () => {
    setErrors([]);
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
    setSmartError,
    hasSmartError,
    clearSmartError,
    clearErrors,
    setErrors: mySetErrors,
    sliceErrors,
    errors,
    showToastsAndSetErrors,
  } as const;
};
