import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getRouteApi, useNavigate} from '@tanstack/react-router';
import {FC, useState} from 'react';
import {AppSpinner} from '../../../atoms/AppSpinner/AppSpinner';
import {getWorkoutsByIdOptions} from '../../../../utils/openapi-client/@tanstack/react-query.gen';
import {WorkoutUpdateDto, patchWorkoutsById, deleteWorkoutsById} from '../../../../utils/openapi-client';
import {UpdateWorkoutPagePresenter} from './components/UpdateWorkoutPagePresenter';

const routeApi = getRouteApi('/workouts/update/$id');
export const UpdateWorkoutPage: FC = () => {
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
    if (!result.data) {
      // eslint-disable-next-line no-alert
      alert('Something went wrong');
      return;
    }

    await client.invalidateQueries({queryKey: ['exercises']});
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
    if (!result.data) {
      // eslint-disable-next-line no-alert
      alert('Something went wrong');
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
