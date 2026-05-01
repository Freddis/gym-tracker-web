import {getRouteApi, useNavigate} from '@tanstack/react-router';
import {FC} from 'react';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {api} from '../../../../../common/utils/api';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {PostEntry} from '../../../../../common/utils/openapi-client/types.gen';
import {PostUpdatePagePresenter} from './components/PostUpdatePagePresenter';
import {useQuery} from '@tanstack/react-query';
import {route, RouteId} from '../../../../../common/utils/route';
import {AppSpinner} from '../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {AppApiErrorDisplay} from '../../../../../common/components/atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {PageContainer} from '../../../../../common/components/layout/PageContainer/PageContainer';
import {PostUpdateFormProps} from '../PostUpdateForm/types/PostUpdateFormProps';

export const PostUpdatePage: FC = () => {
  const navigate = useNavigate();
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities);
  const toasts = useToasts();
  const {showToastsAndSetErrors, sliceErrors, errors} = useResponseErrors<PostEntry>();
  const routeApi = getRouteApi(route(RouteId.PostUpdate));
  const params = routeApi.useParams();
  const save: PostUpdateFormProps['onSave'] = async (data) => {
    const result = await api.patchPostsById({
      path: {
        id: params.id,
      },
      body: {
        data: data.data ?? undefined,
        note: data.note,
        time: data.time,
      },
    });
    if (showToastsAndSetErrors(result)) {
      return;
    }
    toasts.addSuccess(t(i18n.posts.update.toasts.success));
    navigate({to: '/entries'});
  };

  const response = useQuery({
    queryFn: () => api.getPostsById({
      path: {
        id: params.id,
      },
    }),
    queryKey: ['images', params.id],
  });

  if (response.isLoading) {
    return (
      <PageContainer>
        <AppSpinner />
      </PageContainer>
    );
  }

  if (!response.isSuccess || response.data.error) {
    return (
      <PageContainer>
        <AppApiErrorDisplay error={response.data?.error?.error} />
      </PageContainer>
    );
  }

  return (
    <PostUpdatePagePresenter entry={response.data.data} onSave={save} errors={sliceErrors(errors, (x) => x)} />
  );
};
