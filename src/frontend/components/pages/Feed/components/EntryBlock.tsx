import {FC} from 'react';
import {Entry} from '../../../../utils/openapi-client';
import {AppBlock} from '../../../atoms/AppBlock/AppBlock';
import {WorkoutEntryBlock} from './WorkoutEntryBlock';

export const EntryBlock: FC<{entry: Entry}> = ({entry}) => {
  if (entry.workout) {
    return <WorkoutEntryBlock entry={entry} workout={entry.workout!}/>;
  }
  return <AppBlock>Unkown Entry Type</AppBlock>;
};
