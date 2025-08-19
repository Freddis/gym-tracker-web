import {useEffect, useState} from 'react';

export type FieldError = {
  field: string,
  message: string,
}
export const useResponseErrors = (initialErrors?: FieldError[]) => {
  const [errors, setErrors] = useState(initialErrors ?? []);
  useEffect(() => {
    if (!initialErrors) {
      return;
    }
    setErrors(initialErrors);
  }, [initialErrors]);
  const errorMessage = (field: string): string | null => {
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
  return [errorMessage, mySetErrors, errors] as const;
};
