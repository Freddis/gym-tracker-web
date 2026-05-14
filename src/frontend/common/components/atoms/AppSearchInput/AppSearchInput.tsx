import {FC, useState, ChangeEventHandler} from 'react';
import {AppTextInput, AppTextInputProps} from '../AppTextInput/AppTextInput';
import {ZodTypeAny} from 'zod';

type AppSearchInputProps = AppTextInputProps & {
  onSearch: (value:string | null) => void,
  debounce?: number
  minLength?: number
  validator?: ZodTypeAny
}
export const AppSearchInput: FC<AppSearchInputProps> = (props) => {
  const {minLength = 3, debounce = 1000, validator, onSearch, ...rest} = props;
  const [searchValue, setSearchValue] = useState(props.value ?? '');
  const hasError = validator && searchValue !== '' && !validator.safeParse(searchValue).success;
  const [timeoutHandle, setTimeoutHandle] = useState<string>();
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const trimmed = e.target.value.trim();
    if (timeoutHandle) {
      clearTimeout(timeoutHandle);
    }
    setSearchValue(e.target.value);
    if (trimmed.length < minLength) {
      const timeout = setTimeout(() => {
        onSearch(null);
      }, debounce);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setTimeoutHandle(timeout as any);
      return;
    }

    const timeout = setTimeout(() => {
      onSearch(trimmed);
    }, debounce);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setTimeoutHandle(timeout as any);
  };

  return <AppTextInput {...rest} hasError={hasError} onChange={onChange} value={searchValue} />;
};
