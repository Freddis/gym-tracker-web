import {CSSProperties} from 'react';
import {ArgusCheckinContainer} from '../ArgusCheckinContainer/ArgusCheckinContainer';
import {ArgusStatusCheckin} from 'src/backend/model/ArgusCheckin/validators/ArgusStatusCheckin';

export function ArgusStatusCheckinBlock(props: {item: ArgusStatusCheckin}) {
  const item = props.item.data;
  const imageStyle: CSSProperties = {
    width: 100,
    height: 100,
    border: '2px solid black',
    borderRadius: 10,
    objectFit: 'cover',
  };
  return <ArgusCheckinContainer item={props.item}>
          <div style={{marginBottom: 20}}>
           <div>{item.note}</div>
           {item.photos?.map((x) => (
            <div>
              <a href={x.href} target="_blank">
               <img style={imageStyle} src={x.href}/>
               </a>
            </div>
           ))}
          </div>
        </ArgusCheckinContainer>;
}
