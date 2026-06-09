import {FC} from 'react';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {FeedEntry} from '../../../../../common/utils/openapi-client';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {route, RouteId} from '../../../../../common/utils/route';
import {EntryBlockBottom} from './EntryBlockBottom';
import {PostContent} from './PostContent';
import {EntryBlockHeader} from './EntryBlockHeader';

export const PostEntryBlock: FC<{entry: FeedEntry, own?: boolean}> = ({entry, own}) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities.list.objects.post);
  return (
    <AppBlock data-testid={`entry-${entry.id}`}>
      <EntryBlockHeader entry={entry} own={own} to={route(RouteId.PostUpdate)} params={{id: entry.id.toString()}} title={t(i18n.type)} />
      <div className="flex flex-col">
        <PostContent entry={entry} />
      </div>
      <EntryBlockBottom entry={entry} own={own} />
    </AppBlock>
  );
};
