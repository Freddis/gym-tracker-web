import {Entry as EntryDTO} from 'src/server/model/Entry/Entry';
import {OpenApiResponse} from 'src/types/OpenApiResponse';
import {EntryContainer} from './EntryContainer/EntryContainer';


export function Entry(props: {item: OpenApiResponse<EntryDTO>}) {
  return <EntryContainer item={props.item}>{null}</EntryContainer>;
}
