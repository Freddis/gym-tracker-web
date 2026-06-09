import {FC} from 'react';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {route, RouteId} from '../../../../../common/utils/route';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {EntryBlockBottom} from './EntryBlockBottom';
import {FeedEntry, OutdoorWalk, ReducedOutdoorWalk} from '../../../../../common/utils/openapi-client';
import {RoutedWorkoutContent} from './RoutedWorkoutContent';
import {EntryBlockHeader} from './EntryBlockHeader';
import {api} from '../../../../../common/utils/api';
interface OutdoorWalkEntryBlockProps {
  entry: FeedEntry;
  outdoorWalk: ReducedOutdoorWalk;
  own?: boolean;
}
export const OutdoorWalkEntryBlock: FC<OutdoorWalkEntryBlockProps> = (props) => {
  const {entry, own, outdoorWalk} = props;
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities.list.objects.outdoorWalk);
  const fetchOutdoorWalk: () => Promise<OutdoorWalk | null> = async () => {
    const response = await api.getEntriesById({path: {id: entry.id}});
    if (response.data?.outdoorWalk) {
      return response.data.outdoorWalk;
    }
    return null;
  };
  return (
    <AppBlock data-testid={`entry-${entry.id}`}>
      <EntryBlockHeader entry={entry} own={own} to={route(RouteId.EntryView)} params={{id: entry.id.toString()}} title={t(i18n.type)} />
      <RoutedWorkoutContent entry={entry} workout={outdoorWalk} fetchWorkout={fetchOutdoorWalk} />
      <EntryBlockBottom entry={entry} own={own} />
    </AppBlock>
  );
};
