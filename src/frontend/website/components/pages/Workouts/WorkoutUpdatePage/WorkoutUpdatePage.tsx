import {PageContainer} from '../../../../../common/components/layout/PageContainer/PageContainer';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getRouteApi, useNavigate} from '@tanstack/react-router';
import {FC, useMemo} from 'react';
import {AppSpinner} from '../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {WorkoutUpdateDto, patchWorkoutsById, deleteWorkoutsById, getWorkoutsById} from '../../../../../common/utils/openapi-client';
import {WorkoutUpdatePagePresenter} from './components/WorkoutUpdatePagePresenter/WorkoutUpdatePagePresenter';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {AppApiErrorDisplay} from '../../../../../common/components/atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {atom, getDefaultStore, useSetAtom} from 'jotai';
import {route, RouteId} from '../../../../../common/utils/route';
const routeApi = getRouteApi('/workouts/update/$id');

export const WorkoutUpdatePage: FC = () => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities.workouts.update);
  const {showToastsAndSetErrors, errors, sliceErrors} = useResponseErrors<WorkoutUpdateDto>();
  const toasts = useToasts();
  const params = routeApi.useParams();
  const client = useQueryClient();
  const navigation = useNavigate();
  const dtoAtom = useMemo(() => atom<WorkoutUpdateDto>(), []);
  const setUpdateDto = useSetAtom(dtoAtom);
  const id = !Number.isNaN(Number(params.id)) ? Number(params.id) : 0;
  const response = useQuery({
    queryFn: () => getWorkoutsById({
      path: {
        id: id,
      },
    }),
    queryKey: ['entries', id],
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
  const onSaveClick = async () => {
    const jotaiDto = getDefaultStore().get(dtoAtom);
    const result = await patchWorkoutsById({
      path: {
        id: id,
      },
      body: jotaiDto,
    });
    if (showToastsAndSetErrors(result)) {
      return;
    }
    toasts.addSuccess(t(i18n.toasts.success));

    await client.invalidateQueries({queryKey: ['entries']});
    navigation({
      to: route(RouteId.EntryList),
    });
  };

  const onDeleteClick = async () => {
    const result = await deleteWorkoutsById({
      path: {
        id: id,
      },
    });
    if (showToastsAndSetErrors(result)) {
      return;
    }
    navigation({
      to: route(RouteId.EntryList),
    });
  };
  const workout = response.data.data.item;
  return (
   <WorkoutUpdatePagePresenter
    item={workout}
    errors={sliceErrors(errors, (x) => x)}
    onSaveClick={onSaveClick}
    onDeleteClick={onDeleteClick}
    onUpdate={setUpdateDto}
   />
  );
};
