import {ReactNode} from 'react';
import {ArgusCheckinRow} from 'src/backend/services/DrizzleService/types/ArgusCheckinRow/ArgusCheckinRow';
import {AppBlock} from '../../../../../atoms/AppBlock/AppBlock';

export function ArgusCheckinContainer(props: {children: ReactNode, item: ArgusCheckinRow}) {

  const date = new Date(props.item.createdAt);

  return <AppBlock >
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <h3 style={{margin: 0}}>{props.item.subtype ? props.item.subtype : props.item.type}</h3>
            <div style={{marginLeft: 'auto'}}>
              <div>{date.toDateString()}</div>
              <div>{date.toTimeString().split(' ')[0]}</div>
            </div>
          </div>
          {props.children}

        </AppBlock>;
}
