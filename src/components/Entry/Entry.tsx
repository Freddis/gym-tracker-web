import {Entry as EntryDTO} from 'src/server/model/Entry/Entry';
import {OpenApiResponse} from 'src/types/OpenApiResponse';


export function Entry(props: {item: OpenApiResponse<EntryDTO>}) {

  return <div style={{marginTop: 10}} key={props.item.id}>
          <h3>{props.item.type}{props.item.subtype ? ': ' + props.item.subtype : ''}</h3>
          <div>{props.item.createdAt}</div>
        </div>;
}
