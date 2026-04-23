import {FC} from 'react';
import {AppBlock} from '../../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {RouteLink} from '../../../../../../common/components/atoms/RouteLink/RouteLink';
import {PageContainer} from '../../../../../../common/components/layout/PageContainer/PageContainer';
import {route, RouteId} from '../../../../../../common/utils/route';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';
import {PostUpdateForm} from '../../PostUpdateForm/PostUpdateForm';
import {PostUpdateFormProps} from '../../PostUpdateForm/types/PostUpdateFormProps';
import {EntryVisibility, PostEntry} from '../../../../../../common/utils/openapi-client';

export const PostCreatePagePresenter: FC<Omit<PostUpdateFormProps, 'entry'>> = (props) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities);
  const entry: Omit<PostEntry, 'id'|'user'> = {
    visibility: EntryVisibility.PUBLIC,
    time: new Date(),
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    type: 'Post',
    title: null,
    note: null,
    externalId: null,
    externalSource: null,
    image: null,
  };
  return (
    <PageContainer>
       <div className="flex flex-col max-w-5xl w-full">
        <div className="mb-5 -mt-5">
          <RouteLink to={route(RouteId.EntryList)}>{t(i18n.list.heading)}</RouteLink>
          <span className="mx-2">&gt;&gt;</span>
          <RouteLink to={route(RouteId.EntryAdd)}>{t(i18n.create.heading)}</RouteLink>
          <span className="mx-2">&gt;&gt;</span>
          <span>{t(i18n.posts.add.heading)}</span>
        </div>
      </div>
      <AppBlock className="max-w-5xl">
          <AppBlockHeader>{t(i18n.posts.add.heading)}</AppBlockHeader>
          <PostUpdateForm {...{...props, entry}} />
      </AppBlock>
    </PageContainer>
  );
};
