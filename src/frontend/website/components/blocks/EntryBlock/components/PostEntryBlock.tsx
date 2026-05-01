import {FC} from 'react';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {Entry} from '../../../../../common/utils/openapi-client';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {RouteLink} from '../../../../../common/components/atoms/RouteLink/RouteLink';
import {route, RouteId} from '../../../../../common/utils/route';
import {EntryBlockBottom} from './EntryBlockBottom';
import {EntryBlockDate} from './EntryBlockDate';
import {PostContent} from './PostContent';

export const PostEntryBlock: FC<{entry: Entry, own?: boolean}> = ({entry, own}) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities.list.objects.post);
  return (
    <AppBlock data-testid={`entry-${entry.id}`}>
      <div className="flex flex-col sm:flex-row">
        <div className="text-lg font-normal mb-5">
          {!own && `${t(i18n.type)}`}
          {own && (
            <RouteLink to={route(RouteId.PostUpdate)} params={{id: entry.id.toString()}}>{t(i18n.type)}</RouteLink>
          )}
        </div>
        <div className="grow flex flex-row sm:justify-end">
          <EntryBlockDate date={entry.time} />
        </div>
      </div>
      <div className="flex flex-col">
        <PostContent entry={entry} />
      </div>
      <EntryBlockBottom entry={entry} own={own} />
    </AppBlock>
  );
};
