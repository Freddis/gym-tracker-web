import {FC, useRef} from 'react';
import {AppApiErrorDisplay} from '../../../../../../common/components/atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {AppBlock} from '../../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {AppButton} from '../../../../../../common/components/atoms/AppButton/AppButton';
import {AppSeparator} from '../../../../../../common/components/atoms/AppSeparator/AppSeparator';
import {AppSpinner} from '../../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {RouteLink} from '../../../../../../common/components/atoms/RouteLink/RouteLink';
import {BasicPage} from '../../../../../../common/components/layout/BasicPage/BasicPage';
import {PageContainer} from '../../../../../../common/components/layout/PageContainer/PageContainer';
import {ApiResponse} from '../../../../../../common/types/ApiResponse';
import {
  GetEntriesByIdResponse,
  GetEntriesByIdError,
  MealEntryUpsertDto,
  EntryType,
} from '../../../../../../common/utils/openapi-client';
import {route, RouteId} from '../../../../../../common/utils/route';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';
import {BreadCrumbsBlock} from '../../../../blocks/BreadCrumbsBlock/BreadCrumbsBlock';
import {BreadCrumbs} from '../../../../blocks/BreadCrumbsBlock/types/BreadCrumbs';
import {FoodUpdateFormRef} from '../../../Food/FoodUpdateForm/types/FoodUpdateFormRef';
import {MealUpdateForm} from '../../MealUpdateForm/MealUpdateForm';

interface MealUpdatePagePresenterProps {
  response: ApiResponse<GetEntriesByIdResponse, GetEntriesByIdError>;
  onSave: (meal: MealEntryUpsertDto) => void;
  onDelete: (meal: MealEntryUpsertDto) => void;
}

export const MealUpdatePagePresenter: FC<MealUpdatePagePresenterProps> = (props) => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.meals.update);
  const formRef = useRef<FoodUpdateFormRef>(null);
  const breadCrumbs: BreadCrumbs = [
    {label: translations.pages.activities.list.heading, url: route(RouteId.EntryList)},
    {label: t(i18n.heading), url: route(RouteId.MealUpdate)},
  ];
  const onSaveClick = async () => {
    formRef.current?.submit();
  };

  if (props.response.isLoading) {
    return <AppSpinner />;
  }

  if (!props.response.data?.data) {
    return <AppApiErrorDisplay error={props.response.data?.error?.error} />;
  }
  const mealEntry = props.response.data.data;
  const meal = mealEntry.meal;
  if (!meal) {
    return <AppApiErrorDisplay error={{code: 'NotFound'}} />;
  }
  const onSubmit = (meal: MealEntryUpsertDto) => {
    meal.updatedAt = new Date();
    props.onSave(meal);
  };
  const onDeleteClick = async () => {
    const dto: MealEntryUpsertDto = {
      ...mealEntry,
      deletedAt: new Date(),
      meal: meal,
      image: null,
      type: EntryType.MEAL,
      healthkitId: null,
      healthkitAnchor: null,
      healthkitAnchors_3_0: null,
      healthkitSource: null,
      healthkitSourceName: null,
      healthkitDevice: null,
      healthkitDeviceName: null,
    };
    props.onDelete(dto);
  };
  return (
    <PageContainer>
      <BasicPage>
        <BreadCrumbsBlock breadCrumbs={breadCrumbs} />
        <AppBlock>
          <AppBlockHeader>{t(i18n.heading)}</AppBlockHeader>
          <MealUpdateForm meal={meal} entry={mealEntry} onSubmit={onSubmit} ref={formRef} />
          <AppSeparator />
          <div className="flex mt-5 flex-row">
            <RouteLink to={route(RouteId.EntryList)}>{translations.utils.generic.buttons.back}</RouteLink>
            <div className="grow flex flex-row-reverse gap-2">
              <AppButton onClick={onSaveClick}>{translations.utils.generic.buttons.save}</AppButton>
              <AppButton onClick={onDeleteClick}>{translations.utils.generic.buttons.delete}</AppButton>
            </div>
          </div>
        </AppBlock>
      </BasicPage>
    </PageContainer>
  );
};
