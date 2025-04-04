import {ReactNode} from 'react';
import {Entry} from 'src/backend/model/Entry/Entry';

export function EntryContainer(props: {children: ReactNode, item: Entry}) {

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
