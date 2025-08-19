import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getRouteApi, useNavigate} from '@tanstack/react-router';
import {FC, useState} from 'react';
import {AppSpinner} from '../../../atoms/AppSpinner/AppSpinner';
import {getWorkoutsByIdOptions} from '../../../../utils/openapi-client/@tanstack/react-query.gen';
import {UpdateWorkoutForm} from '../common/UpdateWorkoutForm/UpdateWorkoutForm';
import {AppBlock} from '../../../atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../atoms/AppBlock/components/AppBlockHeader';
import {AppButton} from '../../../atoms/AppButton/AppButton';
import {AppLink} from '../../../atoms/AppLink/AppLink';
import {WorkoutUpdateDto, patchWorkoutsById, deleteWorkoutsById} from '../../../../utils/openapi-client';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';

const routeApi = getRouteApi('/workouts/update/$id');
export const UpdateWorkoutPage: FC = () => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities);
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
    <PageContainer>
      <div className="flex flex-col max-w-5xl w-full">
        <div className="mb-5 -mt-5">
          <AppLink to="/entries">{t(i18n.list.heading)}</AppLink>
          <span className="ml-2">&gt;&gt;</span>
          <span className="ml-2">{t(i18n.workouts.update.heading)} {response.data.item.id.toString()}</span>
        </div>
      </div>
      <AppBlock className="max-w-5xl">
        <AppBlockHeader>{t(i18n.workouts.update.heading)} {response.data.item.id.toString()}</AppBlockHeader>
        <UpdateWorkoutForm item={response.data.item} onUpdate={setItemDto}/>
          <div className="mt-5 border-b-1 border-neutral-on-surface"/>
            <div className="mt-5 flex flex-row">
              <AppLink to="/entries">Back</AppLink>
              <div className="grow flex flex-row-reverse gap-2">
                <AppButton onClick={save}>Save</AppButton>
                <AppButton onClick={deleteItem} color={'error'}>Delete</AppButton>
              </div>
          </div>
      </AppBlock>
    </PageContainer>
  );
};
