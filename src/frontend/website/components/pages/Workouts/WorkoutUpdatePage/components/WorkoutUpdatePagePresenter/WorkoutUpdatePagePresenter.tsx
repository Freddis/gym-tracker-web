import {FC} from 'react';
import {useAppPartialTranslation} from '../../../../../../utils/i18n/useAppPartialTranslation';
import {AppBlock} from '../../../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {AppButton} from '../../../../../../../common/components/atoms/AppButton/AppButton';
import {RouteLink} from '../../../../../../../common/components/atoms/RouteLink/RouteLink';
import {PageContainer} from '../../../../../../../common/components/layout/PageContainer/PageContainer';
import {WorkoutUpdateForm} from '../../../WorkoutUpdateForm/WorkoutUpdateForm';
import {route, RouteId} from '../../../../../../../common/utils/route';
import {WorkoutUpdatePagePresenterProps} from './types/WorkoutUpdatePagePresenterProps';
import {BreadCrumbsBlock} from '../../../../../blocks/BreadCrumbsBlock/BreadCrumbsBlock';
import {BasicPage} from '../../../../../../../common/components/layout/BasicPage/BasicPage';
import {BreadCrumbs} from '../../../../../blocks/BreadCrumbsBlock/types/BreadCrumbs';

export const WorkoutUpdatePagePresenter: FC<WorkoutUpdatePagePresenterProps> = (props) => {
  const {errors, item, onSaveClick, onDeleteClick, onUpdate} = props;
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.activities);
  const breadCrumbs: BreadCrumbs = [
    {label: translations.pages.activities.list.heading, url: route(RouteId.EntryList)},
    {label: t(i18n.workouts.update.heading), url: route(RouteId.WorkoutUpdate)},
  ];
  return (
    <PageContainer>
      <BasicPage>
        <BreadCrumbsBlock breadCrumbs={breadCrumbs} />
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
      </BasicPage>
    </PageContainer>
  );
};
