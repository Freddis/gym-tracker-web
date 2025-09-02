import {FC, useState} from 'react';
import {useAppPartialTranslation} from '../../../utils/i18n/useAppPartialTranslation';
import {PageContainer} from '../../layout/PageContainer/PageContainer';
import {AppLink} from '../../atoms/AppLink/AppLink';
import {AppBlock} from '../../atoms/AppBlock/AppBlock';
import {postWorkoutTypes, WorkoutType} from '../../../utils/openapi-client';
import {AppButton} from '../../atoms/AppButton/AppButton';
import {AppBlockHeader} from '../../atoms/AppBlock/components/AppBlockHeader';
import {useToasts} from '../../atoms/AppToast/hooks/useToasts';
import {useQueryClient} from '@tanstack/react-query';
import {useNavigate} from '@tanstack/react-router';
import {WorkoutTypeUpdateForm} from './WorkoutTypeUpdateForm';

export const WorkoutTypeCreatePage: FC = () => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.workoutTypes.create);
  const client = useQueryClient();
  const toasts = useToasts();
  const navigate = useNavigate();
  const [workoutType, setWorkoutPlan] = useState<WorkoutType>({
    id: 0,
    name: null,
    description: null,
    userId: 0,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    planId: null,
    planIndex: null,
    exercises: [],
  });
  const onFormUpdate = (update: Omit<WorkoutType, 'id'>) => {
    setWorkoutPlan({
      ...workoutType,
      ...update,
    });
  };
  const save = async () => {
    const result = await postWorkoutTypes({
      body: {
        name: workoutType.name,
        description: workoutType.description,
        planIndex: null,
        planId: null,
        exercises: workoutType.exercises.map((row) => ({
          index: row.index,
          exerciseId: row.exercise.id,
          sets: row.sets,
        })),
      },
    });
    if (!result.data) {
      // eslint-disable-next-line no-alert
      alert('Something went wrong');
      return;
    }
    await client.invalidateQueries({queryKey: ['workout-types']});
    toasts.addSuccess(t(i18n.toasts.success));
    navigate({
      to: '/workouts/types',
    });
  };
  return (
    <PageContainer className="bg-main">
      <div className="flex flex-col max-w-5xl w-full">
      <div className="mb-5 -mt-5">
        <AppLink to="/workouts/types">{translations.pages.workoutTypes.list.heading}</AppLink>
        <span className="ml-2">&gt;&gt;</span>
        <span className="ml-2">{t(i18n.heading)}</span>
      </div>
        <AppBlock className="max-w-5xl">
          <AppBlockHeader>{t(i18n.heading)}</AppBlockHeader>
          <WorkoutTypeUpdateForm item={workoutType} onUpdate={onFormUpdate} />
          <div className="mt-5 border-b-1 border-neutral-on-surface"/>
            <div className="mt-5 flex flex-row">
              <AppLink to="/workouts/types">{translations.utils.generic.buttons.back}</AppLink>
              <div className="grow flex flex-row-reverse gap-2">
                <AppButton onClick={save}>{translations.utils.generic.buttons.save}</AppButton>
              </div>
          </div>
        </AppBlock>
      </div>
    </PageContainer>
  );
};
