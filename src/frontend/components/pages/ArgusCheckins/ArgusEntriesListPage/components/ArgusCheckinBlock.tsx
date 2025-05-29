import {ArgusCheckin} from 'src/backend/model/ArgusCheckin/ArgusCheckin';
import {ArgusCheckinContainer} from './ArgusCheckinContainer/ArgusCheckinContainer';


export function ArgusCheckinBlock(props: {item: ArgusCheckin}) {
  return <ArgusCheckinContainer item={props.item}>{null}</ArgusCheckinContainer>;
}
