import {FC, useRef} from 'react';
import {AppBlock} from '../../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {AppButton} from '../../../../../../common/components/atoms/AppButton/AppButton';
import {AppSeparator} from '../../../../../../common/components/atoms/AppSeparator/AppSeparator';
import {RouteLink} from '../../../../../../common/components/atoms/RouteLink/RouteLink';
import {BasicPage} from '../../../../../../common/components/layout/BasicPage/BasicPage';
import {PageContainer} from '../../../../../../common/components/layout/PageContainer/PageContainer';
import {FormSubmitRef} from '../../../../../../common/types/FormSubmitRef';
import {CalorieGoal, CalorieGoalEntryUpsertDto, Entry} from '../../../../../../common/utils/openapi-client';
import {route, RouteId} from '../../../../../../common/utils/route';
import {ErrorSlice} from '../../../../../../common/utils/useResponseErrors';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';
import {BreadCrumbsBlock} from '../../../../blocks/BreadCrumbsBlock/BreadCrumbsBlock';
import {BreadCrumbs} from '../../../../blocks/BreadCrumbsBlock/types/BreadCrumbs';
import {CalorieGoalUpdateForm} from '../../CalorieGoalUpdateForm/CalorieGoalUpdateForm';

interface CalorieGoalCreatePagePresenterProps {
  goal: CalorieGoal;
  entry: Entry;
  onSave: (goal: CalorieGoalEntryUpsertDto) => void;
  errors?: ErrorSlice<CalorieGoalEntryUpsertDto>;
}
export const CalorieGoalCreatePagePresenter: FC<CalorieGoalCreatePagePresenterProps> = (props) => {
  const t = useAppPartialTranslation((x) => x.pages.calorieGoal.create);
  const formRef = useRef<FormSubmitRef>(null);
  const breadCrumbs: BreadCrumbs = [
    {label: t.f((x) => x.pages.profile.heading), url: route(RouteId.Profile)},
    {label: t.p((x) => x.heading), url: route(RouteId.CalorieGoalCreate)},
  ];
  const onSaveClick = async () => {
    formRef.current?.submit();
  };
  const onSubmit = (goal: CalorieGoalEntryUpsertDto) => {
    props.onSave(goal);
  };
  return (
    <PageContainer>
      <BasicPage>
        <BreadCrumbsBlock breadCrumbs={breadCrumbs} />
        <AppBlock>
          <AppBlockHeader>{t.p((x) => x.heading)}</AppBlockHeader>
          <CalorieGoalUpdateForm goal={props.goal} entry={props.entry} errors={props.errors} onSubmit={onSubmit} ref={formRef} />
          <AppSeparator />
          <div className="flex mt-5 flex-row">
            <RouteLink to={route(RouteId.Profile)}>{t.f((x) => x.utils.generic.buttons.back)}</RouteLink>
            <div className="grow flex flex-row-reverse gap-2">
              <AppButton onClick={onSaveClick}>{t.f((x) => x.utils.generic.buttons.save)}</AppButton>
            </div>
          </div>
        </AppBlock>
      </BasicPage>
    </PageContainer>
  );
};
