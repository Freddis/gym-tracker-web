import {ArgusCheckinRow} from 'src/backend/services/DrizzleService/types/ArgusCheckinRow/ArgusCheckinRow';
import {ArgusCheckinContainer} from './ArgusCheckinContainer/ArgusCheckinContainer';


export function ArgusCheckinBlock(props: {item: ArgusCheckinRow}) {
  return <ArgusCheckinContainer item={props.item}>{null}</ArgusCheckinContainer>;
}
