import {FC, useState, ChangeEventHandler, InputHTMLAttributes} from 'react';
import {AppTextInput} from '../AppTextInput/AppTextInput';
import {cn} from '../../../utils/cn';
import {ZodTypeAny} from 'zod';

type AppSearchInputProps = InputHTMLAttributes<HTMLInputElement> & {
  onSearch: (value:string | null) => void,
  debounce?: number
  minLength?: number
  validator?: ZodTypeAny
}
export const AppSearchInput: FC<AppSearchInputProps> = (props) => {
  const {minLength = 3, debounce = 1000, validator} = props;
  const [searchValue, setSearchValue] = useState(props.value ?? '');
  const hasError = validator && searchValue !== '' && !validator.safeParse(searchValue).success;
  const errorClasses = hasError ? 'border-1 border-on-danger text-on-danger' : undefined;
  const [timeoutHandle, setTimeoutHandle] = useState<string>();
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const trimmed = e.target.value.trim();
    if (timeoutHandle) {
      clearTimeout(timeoutHandle);
    }
    setSearchValue(e.target.value);
    if (trimmed.length < minLength) {
      const timeout = setTimeout(() => {
        props.onSearch(null);
      }, debounce);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setTimeoutHandle(timeout as any);
      return;
    }

    const timeout = setTimeout(() => {
      props.onSearch(trimmed);
    }, debounce);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setTimeoutHandle(timeout as any);
  };

  return <AppTextInput {...props} className={cn(errorClasses, props.className)} onChange={onChange} value={searchValue} />;
};
