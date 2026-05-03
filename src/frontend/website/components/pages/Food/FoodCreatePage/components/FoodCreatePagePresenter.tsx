import {FC, useRef} from 'react';
import {AppBlock} from '../../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {AppButton} from '../../../../../../common/components/atoms/AppButton/AppButton';
import {RouteLink} from '../../../../../../common/components/atoms/RouteLink/RouteLink';
import {PageContainer} from '../../../../../../common/components/layout/PageContainer/PageContainer';
import {FoodUpsertDto} from '../../../../../../common/utils/openapi-client';
import {route, RouteId} from '../../../../../../common/utils/route';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';
import {FoodUpdateForm, FoodUpdateFormRef} from '../../FoodUpdateForm/FoodUpdateForm';
import {FoodCreatePagePresenterProps} from './types/FoodCreatePagePresenterProps';

export const FoodCreatePagePresenter: FC<FoodCreatePagePresenterProps> = (props) => {
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
  return (
    <PageContainer>
    <div className="flex flex-col max-w-5xl w-full">
     <div className="mb-5 -mt-5">
     <RouteLink to={route(RouteId.EntryList)}>{translations.pages.activities.list.heading}</RouteLink>
     <span className="mx-2">&gt;&gt;</span>
       <RouteLink to={route(RouteId.FoodList)}>{t(i18n.list.heading)}</RouteLink>
       <span className="mx-2">&gt;&gt;</span>
       <span>{t(i18n.create.heading)}</span>
     </div>
   </div>
   <AppBlock className="max-w-5xl">
    <AppBlockHeader>{t(i18n.create.heading)}</AppBlockHeader>
    <FoodUpdateForm errors={props.errors} onSubmit={onSubmit} ref={formRef} />
    <div className="mt-5 border-b-1 border-neutral-on-surface"/>
    <div className="mt-5 flex flex-row">
      <RouteLink to={route(RouteId.FoodList)}>{translations.utils.generic.buttons.back}</RouteLink>
      <div className="grow flex flex-row-reverse gap-2">
        <AppButton onClick={onSaveClick}>{translations.utils.generic.buttons.save}</AppButton>
      </div>
    </div>
   </AppBlock>
 </PageContainer>
  );
};
