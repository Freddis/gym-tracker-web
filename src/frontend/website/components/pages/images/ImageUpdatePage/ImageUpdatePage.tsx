import {getRouteApi, useNavigate} from '@tanstack/react-router';
import {FC} from 'react';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {api} from '../../../../../common/utils/api';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {Image} from '../../../../../common/utils/openapi-client/types.gen';
import {ImageUpdatePagePresenter} from './components/ImageUpdatePagePresenter';
import {useQuery} from '@tanstack/react-query';
import {route, RouteId} from '../../../../../common/utils/route';
import {AppSpinner} from '../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {AppApiErrorDisplay} from '../../../../../common/components/atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {PageContainer} from '../../../../../common/components/layout/PageContainer/PageContainer';

export const ImageUpdatePage: FC = () => {
  const navigate = useNavigate();
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities);
  const toasts = useToasts();
  const {showToastsAndSetErrors, sliceErrors, errors} = useResponseErrors<Image>();
  const routeApi = getRouteApi(route(RouteId.ImageUpdate));
  const params = routeApi.useParams();
  const id = !Number.isNaN(Number(params.id)) ? Number(params.id) : 0;
  const save = async (data: {data:string | null}) => {
    const result = await api.patchImagesById({
      path: {
        id: id,
      },
      body: {
        data: data.data ?? undefined,
      },
    });
    if (showToastsAndSetErrors(result)) {
      return;
    }
    toasts.addSuccess(t(i18n.images.update.toasts.success));
    navigate({to: '/entries'});
  };

  const response = useQuery({
    queryFn: () => api.getImagesById({
      path: {
        id: id,
      },
    }),
    queryKey: ['images', id],
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
  const image = response.data.data.image;
  return (
    <ImageUpdatePagePresenter image={image} onSave={save} errors={sliceErrors(errors, (x) => x)} />
  );
};
