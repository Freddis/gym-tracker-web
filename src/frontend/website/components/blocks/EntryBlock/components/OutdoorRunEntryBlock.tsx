import {FC} from 'react';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {route, RouteId} from '../../../../../common/utils/route';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {EntryBlockBottom} from './EntryBlockBottom';
import {Entry, OutdoorRun} from '../../../../../common/utils/openapi-client';
import {RoutedWorkoutContent} from './RoutedWorkoutContent';
import {EntryBlockHeader} from './EntryBlockHeader';

export const OutdoorRunEntryBlock: FC<{entry: Entry, outdoorRun: OutdoorRun, own?: boolean}> = ({entry, own, outdoorRun}) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities.list.objects.outdoorRun);
  return (
    <AppBlock data-testid={`entry-${entry.id}`}>
      <EntryBlockHeader entry={entry} own={own} to={route(RouteId.EntryView)} params={{id: entry.id.toString()}} title={t(i18n.type)} />
      <RoutedWorkoutContent entry={entry} workout={outdoorRun} />
      <EntryBlockBottom entry={entry} own={own} />
    </AppBlock>
  );
};
