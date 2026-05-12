import {FC} from 'react';
import {
  Meal,
  MealEntryUpsertDto,
} from '../../../../../common/utils/openapi-client';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {route, RouteId} from '../../../../../common/utils/route';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {api} from '../../../../../common/utils/api';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {getRouteApi, useNavigate} from '@tanstack/react-router';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {MealUpdatePagePresenter} from './components/MealUpdatePagePresenter';


const routeApi = getRouteApi(route(RouteId.MealUpdate));
export const MealUpdatePage: FC = () => {
  const toasts = useToasts();
  const navigate = useNavigate();
  const params = routeApi.useParams();
  const client = useQueryClient();
  const {showToastsAndSetErrors} = useResponseErrors<Meal>();
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.meals.update);

  const response = useQuery({
    queryFn: () => api.getEntriesById({
      path: {
        id: params.id,
      },
    }),
    queryKey: ['mealEntry', params.id],
  });

  const onSave = async (entryDto: MealEntryUpsertDto) => {
    const response = await api.putEntries({
      body: {
        items: [entryDto],
      },
    });
    if (response.error) {
      showToastsAndSetErrors(response);
      return;
    }
    await client.invalidateQueries({queryKey: ['mealEntry', params.id]});
    toasts.addSuccess(t(i18n.toasts.success));
    navigate({to: route(RouteId.EntryList)});
  };
  const onDelete = async (dto: MealEntryUpsertDto) => {
    const response = await api.putEntries({
      body: {
        items: [dto],
      },
    });
    if (response.error) {
      showToastsAndSetErrors(response);
      return;
    }
    toasts.addSuccess(t(i18n.toasts.deletionSuccess));
    navigate({to: route(RouteId.EntryList)});
  };
  return <MealUpdatePagePresenter response={response} onSave={onSave} onDelete={onDelete} />;
};
