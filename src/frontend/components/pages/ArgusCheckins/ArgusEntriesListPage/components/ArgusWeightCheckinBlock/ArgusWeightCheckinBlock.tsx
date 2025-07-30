import {ArgusWeightCheckin} from 'src/backend/services/DrizzleService/types/ArgusCheckinRow/validators/ArgusWeightCheckin';
import {ArgusCheckinContainer} from '../ArgusCheckinContainer/ArgusCheckinContainer';

export function ArgusWeightCheckinBlock(props: {item: ArgusWeightCheckin}) {

  return <ArgusCheckinContainer item={props.item}>
          <div style={{marginBottom: 20}}>
            <div>{props.item.data.value.toFixed(1)} kg</div>
          </div>
        </ArgusCheckinContainer>;
}
