import {ChangeEvent} from 'react';
import {AppSelectProps} from './types/AppSelectProps';


export const AppSelect = <T extends string | number>(props: AppSelectProps<T>) => {
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = props.options.find(
      (opt) => String(opt.value) === e.target.value
    );
    if (selected) {
      props.onChange(selected.value);
    }
  };

  return (
    <select value={props.value} className="max-w-full w-100 h-10  px-3 bg-cavity border-in-cavity border-1 rounded-sm" onChange={onChange}>
      {props.options.map((opt) => (
        <option key={String(opt.value)} value={String(opt.value)}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
