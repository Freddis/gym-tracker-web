import {FC} from 'react';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {Entry, Weight} from '../../../../utils/openapi-client';
import {AppBlock} from '../../../atoms/AppBlock/AppBlock';
import {AppAvatar} from '../../../atoms/AppAvatar/AppAvatar';
import {RouteLink} from '../../../atoms/RouteLink/RouteLink';
import {route, RouteId} from '../../../../utils/route';

export const WeightEntryBlock: FC<{weight: Weight, entry: Entry, own?: boolean}> = ({weight, entry, own}) => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.activities.list.objects.weight);
  const date = new Date(weight.createdAt);
  const weekDayString = translations.utils.time.weekDays[date.getDay()];
  return (
    <AppBlock>
      <div className="flex flex-col sm:flex-row">
        <div className="text-lg font-normal mb-5">
          {!own && `${t(i18n.type)}: ${weight.id}`}
          {own && (
            <RouteLink to={route(RouteId.WeightUpdate)} params={{id: weight.id.toString()}}>{t(i18n.type)}: {weight.id}</RouteLink>
          )}
        </div>
        <div className="grow flex flex-row sm:justify-end">
          {weekDayString} {date.toLocaleDateString()}, {date.toLocaleTimeString()}
        </div>
      </div>
      <div className="flex flex-col">
        <div></div>
      </div>
      <div className="mt-5 flex flex-row justify-center items-end">

          <div className="text-5xl font-normal">{weight.weight}</div>
          <div className="text-lg font-semibold">{weight.units}</div>

      </div>
      {!own && (
        <div className="grow flex flex-row-reverse">
          <div className="flex flex-row  items-center">
            <span className="text-accent">{entry.user.name}</span>
            <AppAvatar user={entry.user} className="ml-2"/>
          </div>
        </div>
      )}
    </AppBlock>
  );
};
