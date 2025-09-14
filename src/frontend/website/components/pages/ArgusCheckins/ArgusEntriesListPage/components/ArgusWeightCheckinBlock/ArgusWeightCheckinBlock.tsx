import {ArgusWeightCheckin} from 'src/backend/services/DrizzleService/types/ArgusCheckinRow/validators/ArgusWeightCheckin';
import {ArgusCheckinContainer} from '../ArgusCheckinContainer/ArgusCheckinContainer';

export function ArgusWeightCheckinBlock(props: {item: ArgusWeightCheckin}) {

  return (
    <ArgusCheckinContainer item={props.item}>
      <div>{props.item.data.value.toFixed(1)} kg</div>
    </ArgusCheckinContainer>
  );
}
