import {FC} from 'react';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {Entry, Weight} from '../../../../../common/utils/openapi-client';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {route, RouteId} from '../../../../../common/utils/route';
import {EntryBlockBottom} from './EntryBlockBottom';
import {EntryBlockHeader} from './EntryBlockHeader';

export const WeightEntryBlock: FC<{weight: Weight, entry: Entry, own?: boolean}> = ({weight, entry, own}) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities.list.objects.weight);
  return (
    <AppBlock data-testid={`entry-${entry.id}`}>
      <EntryBlockHeader entry={entry} own={own} to={route(RouteId.WeightUpdate)} params={{id: entry.id.toString()}} title={t(i18n.type)} />
      <div className="flex flex-col">
        <div></div>
      </div>
      <div className="mt-5 flex flex-row justify-center items-end">

          <div className="text-5xl font-normal">{weight.weight.toFixed(2)}</div>
          <div className="text-lg font-semibold">{weight.units}</div>

      </div>
      <EntryBlockBottom entry={entry} own={own} />
    </AppBlock>
  );
};
