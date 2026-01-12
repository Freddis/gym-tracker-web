import {PageContainer} from '../../../../../common/components/layout/PageContainer/PageContainer';
import {FC, useContext} from 'react';
import {postWorkouts, Workout, WorkoutUpdateDto} from '../../../../../common/utils/openapi-client';
import {AppButton} from '../../../../../common/components/atoms/AppButton/AppButton';
import {RouteLink} from '../../../../../common/components/atoms/RouteLink/RouteLink';
import {useNavigate} from '@tanstack/react-router';
import {useQueryClient} from '@tanstack/react-query';
import {AppBlockHeader} from '../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {WorkoutUpdateForm} from '../common/WorkoutUpdateForm/WorkoutUpdateForm';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {useNonRenderingState} from '../../../../../common/utils/useNonRenderingState';
import {route, RouteId} from '../../../../../common/utils/route';
import {AppApiErrorDisplay} from '../../../../../common/components/atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {AuthContext} from '../../../../../common/components/layout/AuthProvider/AuthContext';

export const WorkoutCreatePage: FC = () => {
  const navigation = useNavigate();
  const toasts = useToasts();
  const auth = useContext(AuthContext);
  const {showToastsAndSetErrors} = useResponseErrors();
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.activities);
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
    <PageContainer>
      <div className="flex flex-col max-w-5xl w-full">
        <div className="mb-5 -mt-5" data-testid="breadcrumb-navigation">
          <RouteLink to={route(RouteId.EntryList)} data-testid="breadcrumb-entries">{t(i18n.list.heading)}</RouteLink>
          <span className="ml-2">&gt;&gt;</span>
          <RouteLink to={route(RouteId.EntryAdd)} data-testid="breadcrumb-add-entry">{t(i18n.create.heading)}</RouteLink>
          <span className="ml-2">&gt;&gt;</span>
          <span className="ml-2" data-testid="breadcrumb-current">{t(i18n.workouts.add.heading)}</span>
        </div>
      </div>
      <AppBlock className="max-w-5xl">
        <AppBlockHeader data-testid="page-heading">{t(i18n.workouts.add.heading)}</AppBlockHeader>
        <WorkoutUpdateForm item={item} onUpdate={setItemDto}/>
        <div className="mt-5 border-b-1 border-neutral-on-surface"/>
        <div className="mt-5 flex flex-row">
          <RouteLink to={route(RouteId.EntryAdd)} data-testid="back-button">{translations.utils.generic.buttons.back}</RouteLink>
          <div className="grow flex flex-row-reverse gap-2">
            <AppButton onClick={save} data-testid="save">{translations.utils.generic.buttons.save}</AppButton>
          </div>
        </div>
      </AppBlock>
    </PageContainer>
  );
};


