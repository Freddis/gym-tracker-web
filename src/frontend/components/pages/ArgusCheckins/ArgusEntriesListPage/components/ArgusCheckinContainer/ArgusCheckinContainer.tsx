import {ReactNode} from 'react';
import {ArgusCheckin} from 'src/backend/model/ArgusCheckin/ArgusCheckin';

export function ArgusCheckinContainer(props: {children: ReactNode, item: ArgusCheckin}) {

  const date = new Date(props.item.createdAt);

  return <div style={{marginBottom: 20, border: '1px solid white', padding: 10, borderRadius: 5}} key={props.item.id}>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <h3 style={{margin: 0}}>{props.item.subtype ? props.item.subtype : props.item.type}</h3>
            <div style={{marginLeft: 'auto'}}>
              <div>{date.toDateString()}</div>
              <div>{date.toTimeString().split(' ')[0]}</div>
            </div>
          </div>
          {props.children}

        </div>;
}
