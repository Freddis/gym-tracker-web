import {FC, useRef} from 'react';
import {AppBlock} from '../../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {AppButton} from '../../../../../../common/components/atoms/AppButton/AppButton';
import {AppSeparator} from '../../../../../../common/components/atoms/AppSeparator/AppSeparator';
import {RouteLink} from '../../../../../../common/components/atoms/RouteLink/RouteLink';
import {BasicPage} from '../../../../../../common/components/layout/BasicPage/BasicPage';
import {PageContainer} from '../../../../../../common/components/layout/PageContainer/PageContainer';
import {Entry, Meal, MealEntryUpsertDto} from '../../../../../../common/utils/openapi-client';
import {route, RouteId} from '../../../../../../common/utils/route';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';
import {BreadCrumbsBlock} from '../../../../blocks/BreadCrumbsBlock/BreadCrumbsBlock';
import {BreadCrumbs} from '../../../../blocks/BreadCrumbsBlock/types/BreadCrumbs';
import {FoodUpdateFormRef} from '../../../Food/FoodUpdateForm/types/FoodUpdateFormRef';
import {MealUpdateForm} from '../../MealUpdateForm/MealUpdateForm';

interface MealCreatePagePresenterProps {
  meal: Meal;
  entry: Entry;
  onSave: (meal: MealEntryUpsertDto) => void;
}


export const MealCreatePagePresenter: FC<MealCreatePagePresenterProps> = (props) => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.meals);
  const formRef = useRef<FoodUpdateFormRef>(null);
  const breadCrumbs: BreadCrumbs = [
    {label: translations.pages.activities.list.heading, url: route(RouteId.EntryList)},
    {label: translations.pages.activities.create.heading, url: route(RouteId.EntryAdd)},
    {label: t(i18n.create.heading), url: route(RouteId.MealCreate)},
  ];
  const onSaveClick = async () => {
    formRef.current?.submit();
  };

  return (
    <PageContainer>
      <BasicPage>
        <BreadCrumbsBlock breadCrumbs={breadCrumbs} />
        <AppBlock>
          <AppBlockHeader>{t(i18n.create.heading)}</AppBlockHeader>
          <MealUpdateForm meal={props.meal} entry={props.entry} onSubmit={props.onSave} ref={formRef} />
          <AppSeparator />
          <div className="flex mt-5 flex-row">
            <RouteLink to={route(RouteId.EntryAdd)}>{translations.utils.generic.buttons.back}</RouteLink>
            <div className="grow flex flex-row-reverse gap-2">
              <AppButton onClick={onSaveClick}>{translations.utils.generic.buttons.save}</AppButton>
            </div>
          </div>
        </AppBlock>
      </BasicPage>
    </PageContainer>
  );
};
