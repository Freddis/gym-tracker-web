import {Entry as EntryDTO} from 'src/backend/model/Entry/Entry';
import {EntryContainer} from './EntryContainer/EntryContainer';


export function Entry(props: {item: EntryDTO}) {
  return <EntryContainer item={props.item}>{null}</EntryContainer>;
}
