import {FC} from 'react';
import {AppAvatar} from '../../../../../src/frontend/components/atoms/AppAvatar/AppAvatar';
import {AppLink} from '../../../../../src/frontend/components/atoms/AppLink/AppLink';
import {useAppPartialTranslation} from '../../../../../src/frontend/utils/i18n/useAppPartialTranslation';
import {Entry, Weight} from '../../../../../src/frontend/utils/openapi-client';
import {MobileBlock} from '../../../../components/MobileScreenContainer/MobileBlock/MobileBlock';
import {dateToEntryString} from '../../../../../src/frontend/utils/dateToEntryString';

export const MobileWeightEntryBlock: FC<{weight: Weight, entry: Entry, own?: boolean}> = ({weight, entry, own}) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities.list.objects.weight);
  const date = new Date(weight.createdAt);
  return (
    <MobileBlock>
      <div className="flex flex-col sm:flex-row">
        <div className="font-normal mb-0">
          {!own && `${t(i18n.type)} ${weight.id}`}
          {own && (
            <AppLink to="/weight/update/$id" params={{id: weight.id.toString()}}>{t(i18n.type)}</AppLink>
          )}
        </div>
        <div className="grow flex flex-row sm:justify-end">
        {dateToEntryString(date)}
        </div>
      </div>
      <div className="flex row">
      </div>
      <div className="flex flex-col">
        <div></div>
      </div>
      <div className="mt-5 flex flex-row justify-center items-end">
          <div className="text-4xl font-normal">{weight.weight}</div>
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
    </MobileBlock>
  );
};
