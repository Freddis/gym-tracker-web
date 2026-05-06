import {FC} from 'react';
import {RouteLink} from '../../../../../../../common/components/atoms/RouteLink/RouteLink';
import {PageContainer} from '../../../../../../../common/components/layout/PageContainer/PageContainer';
import {route, RouteId} from '../../../../../../../common/utils/route';
import {AppBlock} from '../../../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {AppButton} from '../../../../../../../common/components/atoms/AppButton/AppButton';
import {useAppPartialTranslation} from '../../../../../../utils/i18n/useAppPartialTranslation';
import {BreadCrumbs} from '../../../../../blocks/BreadCrumbsBlock/types/BreadCrumbs';
import {BasicPage} from '../../../../../../../common/components/layout/BasicPage/BasicPage';
import {BreadCrumbsBlock} from '../../../../../blocks/BreadCrumbsBlock/BreadCrumbsBlock';
import {WorkoutCreatePagePresenterProps} from './types/WorkoutCreatePagePresenterProps';
import {WorkoutUpdateForm} from '../../../WorkoutUpdateForm/WorkoutUpdateForm';

export const WorkoutCreatePagePresenter: FC<WorkoutCreatePagePresenterProps> = (props) => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.activities);
  const breadCrumbs: BreadCrumbs = [
    {label: translations.pages.activities.list.heading, url: route(RouteId.EntryList)},
    {label: t(i18n.create.heading), url: route(RouteId.EntryAdd)},
    {label: t(i18n.workouts.add.heading), url: route(RouteId.WorkoutCreate)},
  ];
  return (
    <PageContainer>
      <BasicPage>
        <BreadCrumbsBlock breadCrumbs={breadCrumbs} />
        <AppBlock>
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
      </BasicPage>
    </PageContainer>
  );
};
