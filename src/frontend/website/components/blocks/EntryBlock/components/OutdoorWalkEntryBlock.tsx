import {FC} from 'react';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {route, RouteId} from '../../../../../common/utils/route';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {EntryBlockBottom} from './EntryBlockBottom';
import {Entry, OutdoorWalk} from '../../../../../common/utils/openapi-client';
import {RoutedWorkoutContent} from './RoutedWorkoutContent';
import {EntryBlockHeader} from './EntryBlockHeader';

export const OutdoorWalkEntryBlock: FC<{entry: Entry, outdoorWalk: OutdoorWalk, own?: boolean}> = ({entry, own, outdoorWalk}) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities.list.objects.outdoorWalk);
  return (
    <AppBlock data-testid={`entry-${entry.id}`}>
      <EntryBlockHeader entry={entry} own={own} to={route(RouteId.EntryView)} params={{id: entry.id.toString()}} title={t(i18n.type)} />
      <RoutedWorkoutContent entry={entry} workout={outdoorWalk} />
      <EntryBlockBottom entry={entry} own={own} />
    </AppBlock>
  );
};
