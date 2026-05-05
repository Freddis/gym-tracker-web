import {route, RouteId} from '../../../../../common/utils/route';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {api} from '../../../../../common/utils/api';
import {useNavigate} from '@tanstack/react-router';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {FoodCreatePagePresenter} from './components/FoodCreatePagePresenter';
import {Food, FoodUpsertDto} from '../../../../../common/utils/openapi-client';
import {useQueryClient} from '@tanstack/react-query';
import {FC} from 'react';

export const FoodCreatePage: FC<{isMeal?: boolean}> = (props) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.food);
  const toasts = useToasts();
  const queryClient = useQueryClient();
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
    await queryClient.invalidateQueries({queryKey: ['food']});
    toasts.addSuccess(t(i18n.create.toasts.success));
    navigate({to: route(RouteId.FoodList)});
  };
  return (
    <FoodCreatePagePresenter isMeal={props.isMeal} errors={sliceErrors(errors, (x) => x)} onSave={onSave} />
  );
};
