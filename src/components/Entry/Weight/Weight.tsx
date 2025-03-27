import {WeightEntry} from 'src/server/model/Entry/validators/WeightEntry';
import {OpenApiResponse} from 'src/types/OpenApiResponse';
import {EntryContainer} from '../EntryContainer/EntryContainer';

export function Weight(props: {item: OpenApiResponse<WeightEntry>}) {

  return <EntryContainer item={props.item}>
          <div style={{marginBottom: 20}}>
            <div>{props.item.data.value.toFixed(1)} kg</div>
          </div>
        </EntryContainer>;
}
