import {WeightEntry} from 'src/backend/model/Entry/validators/WeightEntry';
import {EntryContainer} from '../EntryContainer/EntryContainer';

export function Weight(props: {item: WeightEntry}) {

  return <EntryContainer item={props.item}>
          <div style={{marginBottom: 20}}>
            <div>{props.item.data.value.toFixed(1)} kg</div>
          </div>
        </EntryContainer>;
}
