import {ArgusCheckinContainer} from '../ArgusCheckinContainer/ArgusCheckinContainer';
import {ArgusStatusCheckin} from 'src/backend/services/DrizzleService/types/ArgusCheckinRow/validators/ArgusStatusCheckin';

export function ArgusStatusCheckinBlock(props: {item: ArgusStatusCheckin}) {
  const item = props.item.data;
  return <ArgusCheckinContainer item={props.item}>
           <div>{item.note}</div>
           {item.photos?.map((x) => (
            <div>
              <a href={x.href} target="_blank">
                <div className="rounded-sm overflow-hidden m-5">
                  <img src={x.href} className="w-full"/>
               </div>
               </a>
            </div>
           ))}
        </ArgusCheckinContainer>;
}
