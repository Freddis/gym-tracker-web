import {FC, useRef} from 'react';
import {AppBlock} from '../../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {AppButton} from '../../../../../../common/components/atoms/AppButton/AppButton';
import {RouteLink} from '../../../../../../common/components/atoms/RouteLink/RouteLink';
import {PageContainer} from '../../../../../../common/components/layout/PageContainer/PageContainer';
import {Food, FoodUpsertDto, ServingSizeUnit} from '../../../../../../common/utils/openapi-client';
import {route, RouteId} from '../../../../../../common/utils/route';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';
import {FoodUpdateForm} from '../../FoodUpdateForm/FoodUpdateForm';
import {FoodCreatePagePresenterProps} from './types/FoodCreatePagePresenterProps';
import {FoodUpdateFormRef} from '../../FoodUpdateForm/types/FoodUpdateFormRef';
import {v4} from 'uuid';
import {BasicPage} from '../../../../../../common/components/layout/BasicPage/BasicPage';
import {BreadCrumbsBlock} from '../../../../blocks/BreadCrumbsBlock/BreadCrumbsBlock';
import {BreadCrumbs} from '../../../../blocks/BreadCrumbsBlock/types/BreadCrumbs';

export const FoodCreatePagePresenter: FC<FoodCreatePagePresenterProps> = (props) => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.food);
  const formRef = useRef<FoodUpdateFormRef>(null);
  const food: Food = {
    id: v4(),
    name: '',
    description: null,
    image: null,
    protein: 0,
    carbs: 0,
    fat: 0,
    calories: 0,
    servingSize: null,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    isMeal: !!props.isMeal,
    components: [],
    servingSizeUnit: ServingSizeUnit.GRAM,
  };

  const onSaveClick = async () => {
    formRef.current?.submit();
  };

  const onSubmit = async (food: FoodUpsertDto) => {
    props.onSave({
      ...food,
      updatedAt: new Date(),
    });
  };
  const breadCrumbs: BreadCrumbs = [
    {label: translations.pages.activities.list.heading, url: route(RouteId.EntryList)},
    {label: t(i18n.list.heading), url: route(RouteId.FoodList)},
    {label: t(i18n.create.heading), url: route(RouteId.FoodCreate)},
  ];
  return (
    <PageContainer>
    <BasicPage>
      <BreadCrumbsBlock breadCrumbs={breadCrumbs} />
      <AppBlock>
        <AppBlockHeader>{t(i18n.create.heading)}</AppBlockHeader>
        <FoodUpdateForm food={food} errors={props.errors} onSubmit={onSubmit} ref={formRef} />
        <div className="mt-5 border-b-1 border-neutral-on-surface"/>
        <div className="mt-5 flex flex-row">
          <RouteLink to={route(RouteId.FoodList)}>{translations.utils.generic.buttons.back}</RouteLink>
          <div className="grow flex flex-row-reverse gap-2">
            <AppButton onClick={onSaveClick}>{translations.utils.generic.buttons.save}</AppButton>
          </div>
        </div>
      </AppBlock>
   </BasicPage>
 </PageContainer>
  );
};
