import {FC, useState, ChangeEventHandler, InputHTMLAttributes} from 'react';
import {AppTextInput} from '../AppTextInput/AppTextInput';

type AppSearchInputProps = InputHTMLAttributes<HTMLInputElement> & {
  onSearch: (value:string | null) => void,
  debounce?: number
}
export const AppSearchInput: FC<AppSearchInputProps> = (props) => {
  const [searchValue, setSearchValue] = useState(props.value ?? '');
  const [timeoutHandle, setTimeoutHandle] = useState<string>();
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const trimmed = e.target.value.trim();
    if (timeoutHandle) {
      clearTimeout(timeoutHandle);
    }
    setSearchValue(e.target.value);
    if (trimmed.length < 3) {
      const timeout = setTimeout(() => {
        props.onSearch(null);
      }, props.debounce ?? 0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setTimeoutHandle(timeout as any);
      return;
    }

    const timeout = setTimeout(() => {
      props.onSearch(trimmed);
    }, props.debounce ?? 0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setTimeoutHandle(timeout as any);
  };

  return <AppTextInput onChange={onChange} value={searchValue} />;
};
