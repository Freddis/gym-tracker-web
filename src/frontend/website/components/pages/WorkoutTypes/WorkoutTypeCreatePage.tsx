import {FC, useState} from 'react';
import {useAppPartialTranslation} from '../../../utils/i18n/useAppPartialTranslation';
import {PageContainer} from '../../../../common/components/layout/PageContainer/PageContainer';
import {RouteLink} from '../../../../common/components/atoms/RouteLink/RouteLink';
import {AppBlock} from '../../../../common/components/atoms/AppBlock/AppBlock';
import {postWorkoutTypes, WorkoutType} from '../../../../common/utils/openapi-client';
import {AppButton} from '../../../../common/components/atoms/AppButton/AppButton';
import {AppBlockHeader} from '../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {useToasts} from '../../../../common/components/atoms/AppToast/hooks/useToasts';
import {useQueryClient} from '@tanstack/react-query';
import {useNavigate} from '@tanstack/react-router';
import {WorkoutTypeUpdateForm} from './WorkoutTypeUpdateForm';
import {useResponseErrors} from '../../../../common/utils/useResponseErrors';
import {route, RouteId} from '../../../../common/utils/route';
import {BreadCrumbs} from '../../blocks/BreadCrumbsBlock/types/BreadCrumbs';
import {BreadCrumbsBlock} from '../../blocks/BreadCrumbsBlock/BreadCrumbsBlock';
import {BasicPage} from '../../../../common/components/layout/BasicPage/BasicPage';

export const WorkoutTypeCreatePage: FC = () => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.workoutTypes.create);
  const {showToastsAndSetErrors} = useResponseErrors();
  const client = useQueryClient();
  const toasts = useToasts();
  const navigate = useNavigate();
  const [workoutType, setWorkoutType] = useState<WorkoutType>({
    id: '',
    name: '',
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
    setWorkoutType({
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
    if (showToastsAndSetErrors(result)) {
      return;
    }
    await client.invalidateQueries({queryKey: ['workout-types']});
    toasts.addSuccess(t(i18n.toasts.success));
    navigate({
      to: '/workouts/types',
    });
  };
  const breadCrumbs: BreadCrumbs = [
    {label: translations.pages.workoutTypes.list.heading, url: route(RouteId.WorkoutTypeList)},
    {label: t(i18n.heading), url: route(RouteId.WorkoutTypeCreate)},
  ];
  return (
    <PageContainer className="bg-main">
      <BasicPage>
        <BreadCrumbsBlock breadCrumbs={breadCrumbs} />
        <AppBlock className="max-w-5xl">
          <AppBlockHeader>{t(i18n.heading)}</AppBlockHeader>
          <WorkoutTypeUpdateForm item={workoutType} onUpdate={onFormUpdate} />
          <div className="mt-5 border-b-1 border-neutral-on-surface"/>
            <div className="mt-5 flex flex-row">
              <RouteLink to={route(RouteId.WorkoutTypeList)}>{translations.utils.generic.buttons.back}</RouteLink>
              <div className="grow flex flex-row-reverse gap-2">
                <AppButton onClick={save}>{translations.utils.generic.buttons.save}</AppButton>
              </div>
          </div>
        </AppBlock>
      </BasicPage>
    </PageContainer>
  );
};
