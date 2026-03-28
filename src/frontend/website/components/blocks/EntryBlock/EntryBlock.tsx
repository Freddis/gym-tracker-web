import {FC} from 'react';
import {Entry} from '../../../../common/utils/openapi-client';
import {AppBlock} from '../../../../common/components/atoms/AppBlock/AppBlock';
import {WeightEntryBlock} from './components/WeightEntryBlock';
import {WorkoutEntryBlock} from './components/WorkoutEntryBlock';
import {useAppPartialTranslation} from '../../../utils/i18n/useAppPartialTranslation';
import {ImageEntryBlock} from './components/ImageEntryBlock';

export const EntryBlock: FC<{entry: Entry, own?: boolean}> = ({entry, own}) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.components.entryBlock.labels);
  if (entry.workout) {
    return <WorkoutEntryBlock entry={entry} workout={entry.workout!} own={own}/>;
  }
  if (entry.weight) {
    return <WeightEntryBlock entry={entry} weight={entry.weight} own={own}/>;
  }
  if (entry.image) {
    return <ImageEntryBlock entry={entry} image={entry.image} own={own}/>;
  }
  return <AppBlock>{t(i18n.unkownEntry)}</AppBlock>;
};
