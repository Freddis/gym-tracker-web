import {FC, useCallback, useEffect, useRef} from 'react';
import {useAppPartialTranslation} from '../../../utils/i18n/useAppPartialTranslation';
import {PageContainer} from '../../layout/PageContainer/PageContainer';
import {AppLink} from '../../atoms/AppLink/AppLink';
import {AppBlock} from '../../atoms/AppBlock/AppBlock';
import {deleteWorkoutTypesById, getWorkoutTypesById, patchWorkoutTypesById, WorkoutType} from '../../../utils/openapi-client';
import {AppButton} from '../../atoms/AppButton/AppButton';
import {AppBlockHeader} from '../../atoms/AppBlock/components/AppBlockHeader';
import {useToasts} from '../../atoms/AppToast/hooks/useToasts';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getRouteApi, useNavigate} from '@tanstack/react-router';
import {AppSpinner} from '../../atoms/AppSpinner/AppSpinner';
import {WorkoutTypeUpdateForm} from './WorkoutTypeUpdateForm';

/**
 * Like useState, but doesn't trigger re-renders.
 * Value lives in a ref and persists across renders.
 */
export function useLocalRefState<T extends object>(initialValue: T) {
  const ref = useRef<T>({...initialValue});
  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    const next = typeof value === 'function' ? (value as (prev: T) => T)(ref.current) : value;
    // delete old keys
    Object.keys(ref.current).forEach((key) => {
      delete (ref.current)[key];
    });

    // copy new keys
    Object.keys(next).forEach((key) => {
      (ref.current)[key] = (next)[key];
    });
  }, []);

  return [ref.current, setValue] as const;
}

const routeApi = getRouteApi('/workouts/types/update/$id');
export const WorkoutTypeUpdatePage: FC = () => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.workoutTypes.update);
  const client = useQueryClient();
  const toasts = useToasts();
  const navigate = useNavigate();
  const params = routeApi.useParams();
  const id = !Number.isNaN(Number(params.id)) ? Number(params.id) : 0;
  const response = useQuery({
    queryFn: () => getWorkoutTypesById({
      path: {
        id,
      },
    }),
    queryKey: ['workout-type', id],
  }
  );
  const [workoutType, setWorkoutPlan] = useLocalRefState<Omit<WorkoutType, 'id'>>({
    name: '',
    description: '',
    userId: 0,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    planIndex: null,
    planId: null,
    exercises: [],
  });
  console.log('Render form', workoutType);
  useEffect(() => {
    if (response.data?.data) {
      setWorkoutPlan(response.data?.data);
    }
  }, [response.data?.data]);

  if (response.isLoading || !response.data?.data) {
    return (
        <PageContainer>
          <AppSpinner />
        </PageContainer>
    );
  }

  const onFormUpdate = (update: Omit<WorkoutType, 'id'>) => {
    setWorkoutPlan({
      ...workoutType,
      ...update,
    });
  };

  const deleteButtonClick = async () => {
    const result = await deleteWorkoutTypesById({
      path: {
        id,
      },
    });
    if (!result.data) {
      // eslint-disable-next-line no-alert
      alert('Something went wrong');
      return;
    }
    await client.invalidateQueries({queryKey: ['workout-types', 'workout-type']});
    toasts.addSuccess(t(i18n.toasts.success));
    navigate({
      to: '/workouts/types',
    });
  };

  const saveButtonClick = async () => {
    const result = await patchWorkoutTypesById({
      path: {
        id,
      },
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
    await client.invalidateQueries({queryKey: ['workout-types', 'workout-type']});
    toasts.addSuccess(t(i18n.toasts.success));
    navigate({
      to: '/workouts/types',
    });
  };
  const item = response.data.data;
  return (
    <PageContainer className="bg-main">
      <div className="flex flex-col max-w-5xl w-full">
      <div className="mb-5 -mt-5">
        <AppLink to="/entries">{translations.pages.activities.list.heading}</AppLink>
        <span className="mx-2">&gt;&gt;</span>
        <AppLink to="/workouts/types">{translations.pages.workoutTypes.list.heading}</AppLink>
        <span className="mx-2">&gt;&gt;</span>
        <span>{t(i18n.heading)} {item.id.toString()}</span>
      </div>
        <AppBlock className="max-w-5xl">
          <AppBlockHeader>{t(i18n.heading)} {item.id.toString()}</AppBlockHeader>
          <WorkoutTypeUpdateForm item={item} onUpdate={onFormUpdate} />
          <div className="mt-5 border-b-1 border-neutral-on-surface"/>
            <div className="mt-5 flex flex-row">
              <AppLink to="/workouts/types">{translations.utils.generic.buttons.back}</AppLink>
              <div className="grow flex flex-row-reverse gap-2">
                <AppButton onClick={saveButtonClick}>{translations.utils.generic.buttons.save}</AppButton>
                <AppButton onClick={deleteButtonClick}>{translations.utils.generic.buttons.delete}</AppButton>
              </div>
          </div>
        </AppBlock>
      </div>
    </PageContainer>
  );
};
