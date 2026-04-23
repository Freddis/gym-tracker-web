import {FC} from 'react';
import {AppBlock} from '../../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {RouteLink} from '../../../../../../common/components/atoms/RouteLink/RouteLink';
import {PageContainer} from '../../../../../../common/components/layout/PageContainer/PageContainer';
import {route, RouteId} from '../../../../../../common/utils/route';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';
import {PostUpdateForm} from '../../PostUpdateForm/PostUpdateForm';
import {PostUpdateFormProps} from '../../PostUpdateForm/types/PostUpdateFormProps';

export const PostUpdatePagePresenter: FC<PostUpdateFormProps> = (props) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities);

  return (
    <PageContainer>
       <div className="flex flex-col max-w-5xl w-full">
        <div className="mb-5 -mt-5">
          <RouteLink to={route(RouteId.EntryList)}>{t(i18n.list.heading)}</RouteLink>
          <span className="mx-2">&gt;&gt;</span>
          <span>{t(i18n.posts.update.heading)}</span>
        </div>
      </div>
      <AppBlock className="max-w-5xl">
        <AppBlockHeader>{t(i18n.posts.update.heading)}</AppBlockHeader>
        <PostUpdateForm {...props} />
      </AppBlock>
    </PageContainer>
  );
};
