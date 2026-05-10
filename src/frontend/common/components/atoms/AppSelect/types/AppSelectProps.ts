import {SelectValue} from './SelectValue';

export interface AppSelectProps<T> {
  ['data-testid']?: string;
  options: SelectValue<T>[];
  value?: T;
  onChange?: (value: T) => void;
};
