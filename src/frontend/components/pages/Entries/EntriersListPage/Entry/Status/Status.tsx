import {CSSProperties} from 'react';
import {EntryContainer} from '../EntryContainer/EntryContainer';
import {StatusEntry} from 'src/backend/model/Entry/validators/StatusEntry';

export function Status(props: {item: StatusEntry}) {
  const item = props.item.data;
  const imageStyle: CSSProperties = {
    width: 100,
    height: 100,
    border: '2px solid black',
    borderRadius: 10,
    objectFit: 'cover',
  };
  return <EntryContainer item={props.item}>
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
        </EntryContainer>;
}
