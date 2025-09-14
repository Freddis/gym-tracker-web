import {FC, MouseEventHandler} from 'react';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';
import {AppBlock} from '../../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {AppButton} from '../../../../../../common/components/atoms/AppButton/AppButton';
import {RouteLink} from '../../../../../../common/components/atoms/RouteLink/RouteLink';
import {PageContainer} from '../../../../../../common/components/layout/PageContainer/PageContainer';
import {WorkoutUpdateForm} from '../../common/WorkoutUpdateForm/WorkoutUpdateForm';
import {Workout, WorkoutUpdateDto} from '../../../../../../common/utils/openapi-client';
import {ErrorSlice} from '../../../../../../common/utils/useResponseErrors';
import {route, RouteId} from '../../../../../../common/utils/route';

interface WorkoutUpdatePagePresenterProps {
  item: Workout
  onSaveClick: MouseEventHandler<HTMLButtonElement>
  onDeleteClick: MouseEventHandler<HTMLButtonElement>
  onUpdate: (item: WorkoutUpdateDto) => void
  errors?: ErrorSlice<WorkoutUpdateDto>
}

export const WorkoutUpdatePagePresenter: FC<WorkoutUpdatePagePresenterProps> = ({errors, item, onSaveClick, onDeleteClick, onUpdate}) => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.activities);

  return (
    <PageContainer>
      <div className="flex flex-col max-w-5xl w-full">
        <div className="mb-5 -mt-5">
          <RouteLink to={route(RouteId.EntryList)}>{t(i18n.list.heading)}</RouteLink>
          <span className="ml-2">&gt;&gt;</span>
          <span className="ml-2">{t(i18n.workouts.update.heading)} {item.id.toString()}</span>
        </div>
      </div>
      <AppBlock className="max-w-5xl">
        <AppBlockHeader>{t(i18n.workouts.update.heading)} {item.id.toString()}</AppBlockHeader>
        <WorkoutUpdateForm errors={errors} item={item} onUpdate={onUpdate}/>
        <div className="mt-5 border-b-1 border-neutral-on-surface"/>
        <div className="mt-5 flex flex-row">
          <RouteLink to={route(RouteId.EntryList)}>{translations.utils.generic.buttons.back}</RouteLink>
          <div className="grow flex flex-row-reverse gap-2">
            <AppButton onClick={onSaveClick}>{translations.utils.generic.buttons.save}</AppButton>
            <AppButton onClick={onDeleteClick} color={'error'}>{translations.utils.generic.buttons.delete}</AppButton>
          </div>
        </div>
      </AppBlock>
    </PageContainer>
  );
};
