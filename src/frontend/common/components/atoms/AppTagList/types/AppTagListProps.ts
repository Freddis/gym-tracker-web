import {TagValue} from './TagValue';

export interface AppTagListProps {
  placeholder: string;
  defaultValue: string;
  notFound: string;
  values: TagValue[];
  selected?: TagValue[];
  onSelect: (values: string[]) => void;
  className?: string;
}
