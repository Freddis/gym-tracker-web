import {SelectValue} from './SelectValue';

export interface AppSelectProps<T> {
  options: SelectValue<T>[];
  value?: T;
  onChange: (value: T) => void;
};
