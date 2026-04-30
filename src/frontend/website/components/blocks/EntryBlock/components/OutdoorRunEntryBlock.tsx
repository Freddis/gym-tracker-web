import {FC} from 'react';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {RouteLink} from '../../../../../common/components/atoms/RouteLink/RouteLink';
import {route, RouteId} from '../../../../../common/utils/route';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {EntryBlockBottom} from './EntryBlockBottom';
import {EntryBlockDate} from './EntryBlockDate';
import {Entry, OutdoorRun} from '../../../../../common/utils/openapi-client';
import {RoutedWorkoutContent} from './RoutedWorkoutContent';

export const OutdoorRunEntryBlock: FC<{entry: Entry, outdoorRun: OutdoorRun, own?: boolean}> = ({entry, own, outdoorRun}) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities.list.objects.outdoorRun);
  return (
    <AppBlock data-testid={`entry-${entry.id}`}>
      <div className="flex flex-col sm:flex-row">
        <div className="text-lg font-normal mb-5">
          {!own && `${t(i18n.type)}: ${outdoorRun.id}`}
          {own && (
            <RouteLink to={route(RouteId.WorkoutUpdate)} params={{id: entry.id.toString()}}>{t(i18n.type)}: {entry.id}</RouteLink>
          )}
        </div>
        <div className="grow flex flex-row sm:justify-end">
          <EntryBlockDate date={entry.time} />
        </div>
      </div>
      <RoutedWorkoutContent entry={entry} workout={outdoorRun} />
      <EntryBlockBottom entry={entry} own={own} />
    </AppBlock>
  );
};
