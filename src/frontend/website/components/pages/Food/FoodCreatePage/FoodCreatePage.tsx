import {route, RouteId} from '../../../../../common/utils/route';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {Food} from '../../../../../../backend/services/FoodService/types/Food';
import {api} from '../../../../../common/utils/api';
import {useNavigate} from '@tanstack/react-router';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {FoodCreatePagePresenter} from './components/FoodCreatePagePresenter';
import {FoodUpsertDto} from '../../../../../common/utils/openapi-client';

export const FoodCreatePage = () => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.food);
  const toasts = useToasts();
  const {showToastsAndSetErrors, errors, sliceErrors} = useResponseErrors<Food>();
  const navigate = useNavigate();


  const onSave = async (food: FoodUpsertDto) => {

    const response = await api.upsertFood({
      body: food,
    });
    if (response.error) {
      showToastsAndSetErrors(response);
      return;
    }
    toasts.addSuccess(t(i18n.create.toasts.success));
    navigate({to: route(RouteId.FoodList)});
  };
  return (
    <FoodCreatePagePresenter errors={sliceErrors(errors, (x) => x)} onSave={onSave} />
  );
};
