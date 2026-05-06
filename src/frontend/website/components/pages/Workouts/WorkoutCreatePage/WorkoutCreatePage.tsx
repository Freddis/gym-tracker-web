import {PageContainer} from '../../../../../common/components/layout/PageContainer/PageContainer';
import {FC, useContext} from 'react';
import {postWorkouts, Workout, WorkoutUpdateDto} from '../../../../../common/utils/openapi-client';
import {useNavigate} from '@tanstack/react-router';
import {useQueryClient} from '@tanstack/react-query';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {useNonRenderingState} from '../../../../../common/utils/useNonRenderingState';
import {AppApiErrorDisplay} from '../../../../../common/components/atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {AuthContext} from '../../../../../common/components/layout/AuthProvider/AuthContext';
import {WorkoutCreatePagePresenter} from './components/WorkoutCreatePagePresenter/WorkoutCreatePagePresenter';

export const WorkoutCreatePage: FC = () => {
  const navigation = useNavigate();
  const toasts = useToasts();
  const auth = useContext(AuthContext);
  const {showToastsAndSetErrors} = useResponseErrors();
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities);
  const client = useQueryClient();
  const [itemDto, setItemDto] = useNonRenderingState<WorkoutUpdateDto>({
    typeId: null,
    calories: 0,
    start: new Date(),
    end: null,
    exercises: [],
  });
  const item: Omit<Workout, 'id'> = {
    typeId: null,
    userId: 0,
    calories: 0,
    start: new Date(),
    end: null,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    exercises: [],
  };
  const save = async () => {
    const result = await postWorkouts({
      body: itemDto,
    });
    if (showToastsAndSetErrors(result)) {
      return;
    }
    toasts.addSuccess(t(i18n.create.toasts.success));
    await client.invalidateQueries({queryKey: ['entries']});
    navigation({
      to: '/entries',
    });
  };

  if (!auth.user) {
    return (
        <PageContainer>
          <AppApiErrorDisplay error={{code: 'Unauthorized'}} />
        </PageContainer>
    );
  }

  return (
    <WorkoutCreatePagePresenter item={item} onSaveClick={save} onUpdate={setItemDto} />
  );
};


