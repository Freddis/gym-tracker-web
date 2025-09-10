import {FC, MouseEventHandler} from 'react';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';
import {AppBlock} from '../../../../atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../atoms/AppBlock/components/AppBlockHeader';
import {AppButton} from '../../../../atoms/AppButton/AppButton';
import {AppLink} from '../../../../atoms/AppLink/AppLink';
import {PageContainer} from '../../../../layout/PageContainer/PageContainer';
import {UpdateWorkoutForm} from '../../common/UpdateWorkoutForm/UpdateWorkoutForm';
import {Workout, WorkoutUpdateDto} from '../../../../../utils/openapi-client';

interface UpdateWorkoutPagePresenterProps {
  item: Workout
  onSaveClick: MouseEventHandler<HTMLButtonElement>
  onDeleteClick: MouseEventHandler<HTMLButtonElement>
  onUpdate: (item: WorkoutUpdateDto) => void
}
export const UpdateWorkoutPagePresenter: FC<UpdateWorkoutPagePresenterProps> = ({item, onSaveClick, onDeleteClick, onUpdate}) => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.activities);
  return (
    <PageContainer>
      <div className="flex flex-col max-w-5xl w-full">
        <div className="mb-5 -mt-5">
          <AppLink to="/entries">{t(i18n.list.heading)}</AppLink>
          <span className="ml-2">&gt;&gt;</span>
          <span className="ml-2">{t(i18n.workouts.update.heading)} {item.id.toString()}</span>
        </div>
      </div>
      <AppBlock className="max-w-5xl">
        <AppBlockHeader>{t(i18n.workouts.update.heading)} {item.id.toString()}</AppBlockHeader>
        <UpdateWorkoutForm item={item} onUpdate={onUpdate}/>
        <div className="mt-5 border-b-1 border-neutral-on-surface"/>
        <div className="mt-5 flex flex-row">
          <AppLink to="/entries">{translations.utils.generic.buttons.back}</AppLink>
          <div className="grow flex flex-row-reverse gap-2">
            <AppButton onClick={onSaveClick}>{translations.utils.generic.buttons.save}</AppButton>
            <AppButton onClick={onDeleteClick} color={'error'}>{translations.utils.generic.buttons.delete}</AppButton>
          </div>
        </div>
      </AppBlock>
    </PageContainer>
  );
};
