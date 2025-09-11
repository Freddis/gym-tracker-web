import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getRouteApi, useNavigate} from '@tanstack/react-router';
import {FC, useMemo} from 'react';
import {AppSpinner} from '../../../atoms/AppSpinner/AppSpinner';
import {WorkoutUpdateDto, patchWorkoutsById, deleteWorkoutsById, getWorkoutsById} from '../../../../utils/openapi-client';
import {WorkoutUpdatePagePresenter} from './components/WorkoutUpdatePagePresenter';
import {useResponseErrors} from '../../../../utils/useResponseErrors';
import {AppApiErrorDisplay} from '../../../atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {useToasts} from '../../../atoms/AppToast/hooks/useToasts';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {atom, getDefaultStore, useSetAtom} from 'jotai';

const routeApi = getRouteApi('/workouts/update/$id');
export const WorkoutUpdatePage: FC = () => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities.workouts.update);
  const {showToastsAndSetErrors} = useResponseErrors();
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
      to: '/entries',
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
      to: '/entries',
    });
  };
  const workout = response.data.data.item;
  return (
   <WorkoutUpdatePagePresenter item={workout} onSaveClick={onSaveClick} onDeleteClick={onDeleteClick} onUpdate={setUpdateDto} />
  );
};
