import {AppBlock} from '../../../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {AppButton} from '../../../../../../../common/components/atoms/AppButton/AppButton';
import {RouteLink} from '../../../../../../../common/components/atoms/RouteLink/RouteLink';
import {PageContainer} from '../../../../../../../common/components/layout/PageContainer/PageContainer';
import {route, RouteId} from '../../../../../../../common/utils/route';
import {useAppPartialTranslation} from '../../../../../../utils/i18n/useAppPartialTranslation';
import {FC, useRef} from 'react';
import {FoodUpsertDto} from '../../../../../../../common/utils/openapi-client';
import {FoodUpdateForm} from '../../../FoodUpdateForm/FoodUpdateForm';
import {AppSpinner} from '../../../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {AppApiErrorDisplay} from '../../../../../../../common/components/atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {FoodUpdatePagePresenterProps} from './types/FoodUpdatePagePresenterProps';
import {FoodUpdateFormRef} from '../../../FoodUpdateForm/types/FoodUpdateFormRef';
import {BreadCrumbs} from '../../../../../blocks/BreadCrumbsBlock/types/BreadCrumbs';
import {BreadCrumbsBlock} from '../../../../../blocks/BreadCrumbsBlock/BreadCrumbsBlock';
import {BasicPage} from '../../../../../../../common/components/layout/BasicPage/BasicPage';

export const FoodUpdatePagePresenter: FC<FoodUpdatePagePresenterProps> = (props) => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.food);
  const formRef = useRef<FoodUpdateFormRef>(null);

  const onSaveClick = async () => {
    formRef.current?.submit();
  };

  const onSubmit = async (food: FoodUpsertDto) => {
    props.onSave({
      ...food,
      updatedAt: new Date(),
    });
  };

  const onDeleteClick = async () => {
    if (!props.response.data?.data) {
      return;
    }
    const food: FoodUpsertDto = {
      ...props.response.data.data,
      image: undefined,
      deletedAt: new Date(),
    };
    props.onDelete(food);
  };

  if (props.response.isLoading) {
    return (
      <PageContainer className="bg-main">
        <AppSpinner />
      </PageContainer>
    );
  }
  if (!props.response.data?.data) {
    return (
      <PageContainer className="bg-main">
        <AppApiErrorDisplay error={props.response.data?.error?.error} />
      </PageContainer>
    );
  }
  const breadCrumbs: BreadCrumbs = [
    {label: translations.pages.activities.list.heading, url: route(RouteId.EntryList)},
    {label: t(i18n.list.heading), url: route(RouteId.FoodList)},
    {label: t(i18n.update.heading), url: route(RouteId.FoodUpdate)},
  ];
  return (
    <PageContainer>
      <BasicPage>
        <BreadCrumbsBlock breadCrumbs={breadCrumbs} />
        <AppBlock className="max-w-5xl">
          <AppBlockHeader>{t(i18n.update.heading)}</AppBlockHeader>
          <FoodUpdateForm
            food={props.response.data.data}
            errors={props.errors}
            onSubmit={onSubmit}
            ref={formRef}
          />
          <div className="mt-5 border-b-1 border-neutral-on-surface"/>
          <div className="mt-5 flex flex-row">
            <div className="grow">
              <RouteLink to={route(RouteId.FoodList)}>{translations.utils.generic.buttons.back}</RouteLink>
            </div>
            <div className=" flex flex-row gap-5">
              <AppButton onClick={onDeleteClick}>{translations.utils.generic.buttons.delete}</AppButton>
              <AppButton onClick={onSaveClick}>{translations.utils.generic.buttons.save}</AppButton>
            </div>
          </div>
        </AppBlock>
      </BasicPage>
    </PageContainer>
  );
};
