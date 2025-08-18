import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {FC, useState} from 'react';
import {postWorkouts, Workout, WorkoutUpdateDto} from '../../../../utils/openapi-client';
import {AppButton} from '../../../atoms/AppButton/AppButton';
import {AppLink} from '../../../atoms/AppLink/AppLink';
import {useNavigate} from '@tanstack/react-router';
import {useQueryClient} from '@tanstack/react-query';
import {AppBlockHeader} from '../../../atoms/AppBlock/components/AppBlockHeader';
import {AppBlock} from '../../../atoms/AppBlock/AppBlock';
import {UpdateWorkoutForm} from '../common/UpdateWorkoutForm/UpdateWorkoutForm';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';

export const WorkoutCreatePage: FC = () => {
  const navigation = useNavigate();
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities);
  const client = useQueryClient();
  const [itemDto, setItemDto] = useState<WorkoutUpdateDto>();
  const [item] = useState<Omit<Workout, 'id'>>({
    typeId: null,
    userId: 0,
    calories: 0,
    start: new Date(),
    end: null,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    exercises: [],
  });
  const save = async () => {
    const result = await postWorkouts({
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

  return (
    <PageContainer>
      <div className="flex flex-col max-w-5xl w-full">
        <div className="mb-5 -mt-5">
          <AppLink to="/entries">{t(i18n.list.heading)}</AppLink>
          <span className="ml-2">&gt;&gt;</span>
          <AppLink to="/entries/add">{t(i18n.add.heading)}</AppLink>
          <span className="ml-2">&gt;&gt;</span>
          <span className="ml-2">{t(i18n.workouts.add.heading)}</span>
        </div>
      </div>
      <AppBlock className="max-w-5xl">
        <AppBlockHeader>{'New Workout'}</AppBlockHeader>
        <UpdateWorkoutForm item={item} onUpdate={setItemDto}/>
        <div className="mt-5 border-b-1 border-neutral-on-surface"/>
        <div className="mt-5 flex flex-row">
          <AppLink to="/entries/add">Back</AppLink>
          <div className="grow flex flex-row-reverse gap-2">
            <AppButton onClick={save}>Save</AppButton>
          </div>
        </div>
      </AppBlock>
    </PageContainer>
  );
};

