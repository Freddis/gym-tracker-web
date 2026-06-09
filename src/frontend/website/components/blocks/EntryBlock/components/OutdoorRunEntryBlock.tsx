import {FC} from 'react';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {route, RouteId} from '../../../../../common/utils/route';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {EntryBlockBottom} from './EntryBlockBottom';
import {FeedEntry, OutdoorRun, ReducedOutdoorRun} from '../../../../../common/utils/openapi-client';
import {RoutedWorkoutContent} from './RoutedWorkoutContent';
import {EntryBlockHeader} from './EntryBlockHeader';
import {api} from '../../../../../common/utils/api';

export const OutdoorRunEntryBlock: FC<{entry: FeedEntry, outdoorRun: ReducedOutdoorRun, own?: boolean}> = ({entry, own, outdoorRun}) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities.list.objects.outdoorRun);
  const fetchOutdoorRun: () => Promise<OutdoorRun | null> = async () => {
    const response = await api.getEntriesById({path: {id: entry.id}});
    if (response.data?.outdoorRun) {
      return response.data.outdoorRun;
    }
    return null;
  };
  return (
    <AppBlock data-testid={`entry-${entry.id}`}>
      <EntryBlockHeader entry={entry} own={own} to={route(RouteId.EntryView)} params={{id: entry.id.toString()}} title={t(i18n.type)} />
      <RoutedWorkoutContent entry={entry} workout={outdoorRun} fetchWorkout={fetchOutdoorRun} />
      <EntryBlockBottom entry={entry} own={own} />
    </AppBlock>
  );
};
