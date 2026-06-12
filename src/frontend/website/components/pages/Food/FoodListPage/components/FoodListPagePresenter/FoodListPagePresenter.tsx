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
import {AppSearchInput} from '../../../../../../../common/components/atoms/AppSearchInput/AppSearchInput';
import {AppButton} from '../../../../../../../common/components/atoms/AppButton/AppButton';
import {FoodListPagePresenterProps} from './types/FoodListPagePresenterProps';
import {FoodBlock} from '../FoodBlock/FoodBlock';
import {AppSpinner} from '../../../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {AppApiErrorDisplay} from '../../../../../../../common/components/atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {UserProfileBlock} from '../../../../../layout/UserProfileBlock/UserProfileBlock';
import {BasicPage} from '../../../../../../../common/components/layout/BasicPage/BasicPage';
import {AppPageHeading} from '../../../../../../../common/components/atoms/AppPageHeading/AppPageHeading';
import {InputLabel} from '../../../../../../../common/components/atoms/InputLabel/InputLabel';
import {InputRow} from '../../../../../../../common/components/atoms/InputRow/InputRow';
import {AppSwitch} from '../../../../../../../common/components/atoms/AppSwitch/AppSwitch';

export const FoodListPagePresenter: FC<FoodListPagePresenterProps> = (props) => {
  const t = useAppPartialTranslation((x) => x.pages.food.list);
  const hasFilters = false;

  const onSearchChange = (search: string | null) => {
    props.onFilter({
      ...props.filters,
      search: search ?? undefined,
      page: 1,
    });
  };
  const onIsDishChange = (isDish: boolean) => {
    props.onFilter({
      ...props.filters,
      isDish: isDish === true ? true : undefined,
      page: 1,
    });
  };
  const onNoDishChange = (noDish: boolean) => {
    props.onFilter({
      ...props.filters,
      isDish: noDish === true ? false : undefined,
      page: 1,
    });
  };
  return (
  <PageContainer>
    <BasicPage>
      <div className=" w-full mb-5 flex flex-row gap-5 items-start">
      <AppPageHeading>{t.p((x) => x.heading)}</AppPageHeading>
        {props.user && (
          <div className="grow flex flex-row-reverse gap-5">
            <RouteLink to={route(RouteId.FoodCreate)} className="z-0">
                <AppButton>{t.p((x) => x.buttons.addFood)}</AppButton>
              </RouteLink>
              <RouteLink to={route(RouteId.FoodCreateMeal)} className="z-0">
                <AppButton>{t.p((x) => x.buttons.addDish)}</AppButton>
            </RouteLink>
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-5 items-start">
        <div className="flex flex-col gap-5">
          {props.user && <UserProfileBlock user={props.user} own/>}
          <AppSidebarBlock>
            {hasFilters && (
              <AppLink className="absolute top-5 right-5" onClick={props.onClearFilters}>
                {t.p((x) => x.filter.clearFilters)}
              </AppLink>
              )}
            <div className="flex flex-col gap-5">
              <InputRow>
                <InputLabel>{t.p((x) => x.filter.labels.search)}</InputLabel>
                <AppSearchInput debounce={500} onSearch={onSearchChange} value={props.filters.search ?? ''} />
              </InputRow>
              <InputRow>
                <AppSwitch
                  label={t.p((x) => x.filter.labels.isDish)}
                  checked={props.filters.isDish ?? false}
                  onCheckedChange={onIsDishChange}
                />
              </InputRow>
              <InputRow>
                <AppSwitch
                  label={t.p((x) => x.filter.labels.noDishes)}
                  checked={props.filters.isDish === false}
                  onCheckedChange={onNoDishChange}
                />
              </InputRow>
            </div>
          </AppSidebarBlock>
        </div>
        <div className="flex flex-col gap-5 grow w-full" data-testid="main-content">
          {props.response.isLoading && <AppSpinner/>}
          {(props.response.data?.error || props.response.isError) && <AppApiErrorDisplay error={props.response.data?.error?.error}/>}
          {props.response.data?.data && props.response.data.data.items.length > 0 && (
            <>
              <div className="grid grid-cols-3 gap-5">
              {props.response.data.data.items.map((item) => <FoodBlock key={item.id} food={item} own={!!props.user} />)}
              </div>
              <div className="flex justify-center">
                <Pagination onPageChanged={props.onPageChanged} info={props.response.data?.data.info} />
              </div>
            </>
          )}
          {props.response.data?.data?.items.length === 0 && (
            <AppToast variant={Color.Warning}>{t.p((x) => x.toasts.nothingFound)}</AppToast>
          )}
        </div>
      </div>
    </BasicPage>
  </PageContainer>
  );
};
