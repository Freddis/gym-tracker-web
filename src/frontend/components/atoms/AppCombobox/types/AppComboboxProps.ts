import {ComboValue} from './ComboValue';

export interface AppComboboxProps {
  placeholder: string,
  defaultValue: string,
  notFound: string,
  className?: string,
  values: ComboValue[]
  selected?: string
}
