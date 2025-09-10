import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getRouteApi} from '@tanstack/react-router';
import {deleteExercisesById, Exercise, getExercisesById, patchExercisesById} from '../../../../utils/openapi-client';
import {AppSpinner} from '../../../atoms/AppSpinner/AppSpinner';
import {AppBlock} from '../../../atoms/AppBlock/AppBlock';
import {AppLink} from '../../../atoms/AppLink/AppLink';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {AppApiErrorDisplay} from '../../../atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {FC} from 'react';
import {ExerciseUpdateForm} from '../common/ExerciseUpdateForm';
import {AppToast} from '../../../atoms/AppToast/AppToast';
import {Color} from '../../../../utils/design-system/types/Color';
import {AppButton} from '../../../atoms/AppButton/AppButton';
import {useResponseErrors} from '../../../../utils/useResponseErrors';
import {useLocalRefState} from '../../../../utils/useLocalRefState';
import {useToasts} from '../../../atoms/AppToast/hooks/useToasts';

const routeApi = getRouteApi('/exercises/update/$exerciseId');

export const UpdateExercisePage: FC = () => {
  const params = routeApi.useParams();
  const navigate = routeApi.useNavigate();
  const {showToastsAndSetErrors, errors} = useResponseErrors();
  const toasts = useToasts();
  const client = useQueryClient();
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.exercises);
  const [exerciseDto, setExercieDto] = useLocalRefState<Omit<Exercise, 'id'>>({
    params: [],
    name: '',
    description: null,
    difficulty: null,
    equipment: null,
    images: [],
    userId: null,
    copiedFromId: null,
    parentExerciseId: null,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    muscles: {
      primary: [],
      secondary: [],
    },
    variations: [],
  });
  const id = !Number.isNaN(Number(params.exerciseId)) ? Number(params.exerciseId) : 0;
  const response = useQuery({
    queryFn: () => getExercisesById({
      path: {
        id,
      },
    }),
    retry: 0,
    queryKey: ['exercises', id],
  });

  if (response.isLoading) {
    return (
        <PageContainer>
          <AppSpinner/>
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
  const exercise = response.data.data;
  if (exercise.userId === null) {
    return (
      <PageContainer>
        <AppToast variant={Color.Danger}>{t(i18n.update.toasts.cannotUpdateBuiltIn)}</AppToast>
      </PageContainer>
    );
  }
  const onDeleteClick = async () => {
    const result = await deleteExercisesById({
      path: {
        id: id,
      },
    });
    if (showToastsAndSetErrors(result)) {
      return;
    }
    navigate({
      to: '/exercises',
    });
  };
  const onSaveClick = async () => {
    const result = await patchExercisesById({
      path: {
        id: id,
      },
      body: {
        name: exerciseDto.name,
        description: exerciseDto.description,
      },
    });
    if (showToastsAndSetErrors(result)) {
      return;
    }
    await client.invalidateQueries({queryKey: ['exercises']});
    toasts.addSuccess(t(i18n.update.toasts.success));
    navigate({
      to: '/exercises',
    });
  };
  return (
    <PageContainer>
        <div className="flex flex-col max-w-5xl w-full">
        <div className="mb-5 -mt-5">
          <AppLink to="/exercises">{t(i18n.list.heading)}</AppLink>
          <span className="ml-2">&gt;&gt;</span>
          <span className="ml-2">{t(i18n.update.heading)} {exercise.id.toString()}</span>
        </div>
      </div>
      <AppBlock className="max-w-5xl">
        <ExerciseUpdateForm onUpdate={setExercieDto} errors={errors} item={exercise}/>
        <div className="mt-5 border-b-1 border-neutral-on-surface"/>
        <div className="mt-5 flex flex-row">
          <AppLink to="/exercises">{translations.utils.generic.buttons.back}</AppLink>
          <div className="grow flex flex-row-reverse gap-2">
            <AppButton onClick={onSaveClick}>{translations.utils.generic.buttons.save}</AppButton>
            <AppButton onClick={onDeleteClick} color={'error'}>{translations.utils.generic.buttons.delete}</AppButton>
          </div>
        </div>
      </AppBlock>
    </PageContainer>
  );
};
