import {FC} from 'react';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {Entry, Weight} from '../../../../../common/utils/openapi-client';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {RouteLink} from '../../../../../common/components/atoms/RouteLink/RouteLink';
import {route, RouteId} from '../../../../../common/utils/route';
import {EntryBlockBottom} from './EntryBlockBottom';
import {EntryBlockDate} from './EntryBlockDate';

export const WeightEntryBlock: FC<{weight: Weight, entry: Entry, own?: boolean}> = ({weight, entry, own}) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities.list.objects.weight);
  return (
    <AppBlock data-testid={`entry-${entry.id}`}>
      <div className="flex flex-col sm:flex-row">
        <div className="text-lg font-normal mb-5">
          {!own && `${t(i18n.type)}`}
          {own && (
            <RouteLink to={route(RouteId.WeightUpdate)} params={{id: entry.id.toString()}}>{t(i18n.type)}</RouteLink>
          )}
        </div>
        <div className="grow flex flex-row sm:justify-end">
          <EntryBlockDate date={entry.time} />
        </div>
      </div>
      <div className="flex flex-col">
        <div></div>
      </div>
      <div className="mt-5 flex flex-row justify-center items-end">

          <div className="text-5xl font-normal">{weight.weight}</div>
          <div className="text-lg font-semibold">{weight.units}</div>

      </div>
      <EntryBlockBottom entry={entry} own={own} />
    </AppBlock>
  );
};
