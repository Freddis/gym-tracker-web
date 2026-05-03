import {route, RouteId} from '../../../../../common/utils/route';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {FC} from 'react';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {Food} from '../../../../../../backend/services/FoodService/types/Food';
import {api} from '../../../../../common/utils/api';
import {getRouteApi, useNavigate} from '@tanstack/react-router';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {FoodUpdatePagePresenter} from './components/FoodUpdatePagePresenter/FoodUpdatePagePresenter';
import {useQuery} from '@tanstack/react-query';
import {FoodUpsertDto} from '../../../../../common/utils/openapi-client';

export const FoodUpdatePage: FC = () => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.food.update);
  const toasts = useToasts();
  const {sliceErrors, showToastsAndSetErrors, errors} = useResponseErrors<Food>();
  const navigate = useNavigate();
  const routeApi = getRouteApi(route(RouteId.FoodUpdate));
  const params = routeApi.useParams();
  const response = useQuery({
    queryFn: () => api.getFood({
      path: {
        id: params.id,
      },
    }),
    queryKey: ['food', params.id],
  });
  const onSave = async (food: FoodUpsertDto) => {
    const response = await api.upsertFood({
      body: food,
    });
    if (response.error) {
      showToastsAndSetErrors(response);
      return;
    }
    toasts.addSuccess(t(i18n.toasts.success));
    navigate({to: route(RouteId.FoodList)});
  };
  const onDelete = async (food: FoodUpsertDto) => {
    const deleteResponse = await api.upsertFood({
      body: food,
    });
    if (deleteResponse.error) {
      showToastsAndSetErrors(deleteResponse);
      return;
    }
    toasts.addSuccess(t(i18n.toasts.deletionSuccess));
    navigate({to: route(RouteId.FoodList)});
  };
  return (
    <FoodUpdatePagePresenter response={response} errors={sliceErrors(errors, (x) => x)} onSave={onSave} onDelete={onDelete} />
  );
};
