import {FC, MouseEventHandler} from 'react';
import {RouteLink} from '../../../../../../common/components/atoms/RouteLink/RouteLink';
import {PageContainer} from '../../../../../../common/components/layout/PageContainer/PageContainer';
import {route, RouteId} from '../../../../../../common/utils/route';
import {AppBlock} from '../../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {AppButton} from '../../../../../../common/components/atoms/AppButton/AppButton';
import {WorkoutUpdateForm} from '../../common/WorkoutUpdateForm/WorkoutUpdateForm';
import {Workout, WorkoutUpdateDto} from '../../../../../../common/utils/openapi-client';
import {ErrorSlice} from '../../../../../../common/utils/useResponseErrors';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';

interface WorkoutCreatePagePresenterProps {
  item: Omit<Workout, 'id'>
  onSaveClick: MouseEventHandler<HTMLButtonElement>
  onUpdate: (item: WorkoutUpdateDto) => void
  errors?: ErrorSlice<WorkoutUpdateDto>
}

export const WorkoutCreatePagePresenter: FC<WorkoutCreatePagePresenterProps> = (props) => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.activities);
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
        <WorkoutUpdateForm item={props.item} onUpdate={props.onUpdate}/>
        <div className="mt-5 border-b-1 border-neutral-on-surface"/>
        <div className="mt-5 flex flex-row">
          <RouteLink to={route(RouteId.EntryAdd)} data-testid="back-button">{translations.utils.generic.buttons.back}</RouteLink>
          <div className="grow flex flex-row-reverse gap-2">
            <AppButton onClick={props.onSaveClick} data-testid="save">{translations.utils.generic.buttons.save}</AppButton>
          </div>
        </div>
      </AppBlock>
    </PageContainer>
  );
};
