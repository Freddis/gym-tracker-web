import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getRouteApi, useNavigate} from '@tanstack/react-router';
import {FC, useState} from 'react';
import {AppSpinner} from '../../../atoms/AppSpinner/AppSpinner';
import {getWorkoutsByIdOptions} from '../../../../utils/openapi-client/@tanstack/react-query.gen';
import {WorkoutUpdateDto, patchWorkoutsById, deleteWorkoutsById} from '../../../../utils/openapi-client';
import {UpdateWorkoutPagePresenter} from './components/UpdateWorkoutPagePresenter';
import {useResponseErrors} from '../../../../utils/useResponseErrors';

const routeApi = getRouteApi('/workouts/update/$id');
export const UpdateWorkoutPage: FC = () => {
  const {showToastsAndSetErrors} = useResponseErrors();
  const params = routeApi.useParams();
  const client = useQueryClient();
  const navigation = useNavigate();
  const [itemDto, setItemDto] = useState<WorkoutUpdateDto>();
  const id = !Number.isNaN(Number(params.id)) ? Number(params.id) : 0;
  const response = useQuery(getWorkoutsByIdOptions({
    path: {
      id: id,
    },
  }),
  );

  if (response.isLoading || !response.data) {
    return (
        <PageContainer>
          <AppSpinner />
        </PageContainer>
    );
  }
  const item = response.data.item;
  const save = async () => {
    const result = await patchWorkoutsById({
      path: {
        id: item.id,
      },
      body: itemDto,
    });
    if (showToastsAndSetErrors(result)) {
      return;
    }
    await client.invalidateQueries({queryKey: ['entries']});
    navigation({
      to: '/entries',
    });
  };

  const deleteItem = async () => {
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
  return (
   <UpdateWorkoutPagePresenter item={response.data.item} onSaveClick={save} onDeleteClick={deleteItem} onUpdate={setItemDto} />
  );
};
