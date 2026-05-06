import {FC} from 'react';
import {useAppPartialTranslation} from '../../../../../../utils/i18n/useAppPartialTranslation';
import {AppLink} from '../../../../../../../common/components/atoms/AppLink/AppLink';
import {AppSidebarBlock} from '../../../../../../../common/components/atoms/AppSidebarBlock/AppSidebarBlock';
import {AppToast} from '../../../../../../../common/components/atoms/AppToast/AppToast';
import {Pagination} from '../../../../../../../common/components/atoms/Pagination/Pagination';
import {PageContainer} from '../../../../../../../common/components/layout/PageContainer/PageContainer';
import {Color} from '../../../../../../../common/utils/design-system/types/Color';
import {route, RouteId} from '../../../../../../../common/utils/route';
import {RouteLink} from '../../../../../../../common/components/atoms/RouteLink/RouteLink';
import {AppLabel} from '../../../../../../../common/components/atoms/AppLabel/AppLabel';
import {AppSearchInput} from '../../../../../../../common/components/atoms/AppSearchInput/AppSearchInput';
import {AppButton} from '../../../../../../../common/components/atoms/AppButton/AppButton';
import {FoodListPagePresenterProps} from './types/FoodListPagePresenterProps';
import {FoodBlock} from '../FoodBlock/FoodBlock';
import {AppSpinner} from '../../../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {AppApiErrorDisplay} from '../../../../../../../common/components/atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {BreadCrumbs} from '../../../../../blocks/BreadCrumbsBlock/types/BreadCrumbs';
import {BreadCrumbsBlock} from '../../../../../blocks/BreadCrumbsBlock/BreadCrumbsBlock';


export const FoodListPagePresenter: FC<FoodListPagePresenterProps> = (props) => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.food.list);
  const hasFilters = false;
  const breadCrumbs: BreadCrumbs = [
    {label: translations.pages.activities.list.heading, url: route(RouteId.EntryList)},
    {label: t(i18n.heading), url: route(RouteId.FoodList)},
  ];
  return (
    <PageContainer className="bg-main">
      <div className="flex flex-col max-w-5xl w-full">
        <div className="mb-5 w-full flex flex-row gap-5 items-start">
          <BreadCrumbsBlock breadCrumbs={breadCrumbs} />
          <div className="grow flex flex-row-reverse gap-5">
            <RouteLink to={route(RouteId.FoodCreate)} className="z-0">
              <AppButton>{t(i18n.buttons.addFood)}</AppButton>
            </RouteLink>
            <RouteLink to={route(RouteId.FoodCreateMeal)} className="z-0">
              <AppButton>{t(i18n.buttons.addDish)}</AppButton>
          </RouteLink>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 items-start">
        <AppSidebarBlock>
        {hasFilters && <AppLink className="absolute top-5 right-5" onClick={props.onClearFilters}>{t(i18n.filter.clearFilters)}</AppLink>}
        <AppLabel className="mb-2 block">{t(i18n.filter.labels.search)}</AppLabel>
        <AppSearchInput
          debounce={500} className="max-w-100 mb-5" onSearch={props.onSearch} value={props.filters.search ?? ''} />
        </AppSidebarBlock>

          <div className="flex flex-col gap-5 grow w-full" data-testid="main-content">
            {props.response.isLoading && <AppSpinner/>}
            {(props.response.data?.error || props.response.isError) && <AppApiErrorDisplay error={props.response.data?.error?.error}/>}
            {props.response.data?.data && props.response.data.data.items.length > 0 && (
              <>
                <div className="grid grid-cols-2 gap-5">
                {props.response.data.data.items.map((item) => <FoodBlock key={item.id} food={item} />)}
                </div>
                <div className="flex justify-center">
                  <Pagination onPageChanged={props.onPageChanged} info={props.response.data?.data.info} />
                </div>
              </>
            )}
            {props.response.data?.data?.items.length === 0 && (
              <AppToast variant={Color.Warning}>{t(i18n.toasts.nothingFound)}</AppToast>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
