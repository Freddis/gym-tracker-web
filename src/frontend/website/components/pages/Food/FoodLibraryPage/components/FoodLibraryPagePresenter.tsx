import {FC, useEffect} from 'react';
import {FoodListQueryParams} from '../../FoodListPage/components/FoodListPagePresenter/types/FoodListQueryParams';
import {FindFoodError, FindFoodResponse} from '../../../../../../common/utils/openapi-client';
import {AppLink} from '../../../../../../common/components/atoms/AppLink/AppLink';
import {AppPageHeading} from '../../../../../../common/components/atoms/AppPageHeading/AppPageHeading';
import {AppSearchInput} from '../../../../../../common/components/atoms/AppSearchInput/AppSearchInput';
import {AppSidebarBlock} from '../../../../../../common/components/atoms/AppSidebarBlock/AppSidebarBlock';
import {AppSpinner} from '../../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {AppToast} from '../../../../../../common/components/atoms/AppToast/AppToast';
import {InputLabel} from '../../../../../../common/components/atoms/InputLabel/InputLabel';
import {InputRow} from '../../../../../../common/components/atoms/InputRow/InputRow';
import {BasicPage} from '../../../../../../common/components/layout/BasicPage/BasicPage';
import {PageContainer} from '../../../../../../common/components/layout/PageContainer/PageContainer';
import {Color} from '../../../../../../common/utils/design-system/types/Color';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';
import {FoodBlock} from '../../FoodListPage/components/FoodBlock/FoodBlock';
import {useInView} from 'react-intersection-observer';
import {InfiniteApiResponse} from '../../../../../../common/types/InfiniteApiResponse';

interface FoodLibraryPagePresenterProps {
  filters: FoodListQueryParams;
  response: InfiniteApiResponse<FindFoodResponse, FindFoodError>;
  onClearFilters: () => void;
  onFilter: (filter: FoodListQueryParams) => void;
  onRequireNextPage: () => void;
}

export const FoodLibraryPagePresenter: FC<FoodLibraryPagePresenterProps> = (props) => {
  const t = useAppPartialTranslation((x) => x.pages.food.list);
  const hasFilters = false;
  const {ref, inView} = useInView({
    rootMargin: '50%',
  });
  useEffect(() => {
    if (inView) {
      props.onRequireNextPage();
    }
  }, [inView]);
  const onSearchChange = (search: string | null) => {
    props.onFilter({
      ...props.filters,
      search: search ?? undefined,
      page: 1,
    });
  };
  const items = props.response.data?.pages.flatMap((x) => x.data?.items).filter((x) => x !== undefined) ?? [];
  return (
  <PageContainer>
    <BasicPage>
      <div className=" w-full mb-5 flex flex-row gap-5 items-start">
        <AppPageHeading>{t.p((x) => x.heading)}</AppPageHeading>
      </div>
      <div className="flex flex-col md:flex-row gap-5 items-start">
        <div className="flex flex-col gap-5">
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
            </div>
          </AppSidebarBlock>
        </div>
        <div className="flex flex-col gap-5 grow w-full" data-testid="main-content">
          {props.response.isLoading && <AppSpinner />}
          {items.length > 0 && (
              <>
              <div className="grid grid-cols-3 gap-5">
              {items.map((item) => <FoodBlock key={item.id} food={item} own={false} />)}
              </div>
            </>
          )}
          {props.response.isFetchingNextPage ? <AppSpinner/> : null}
          {!props.response.isLoading && items.length === 0 && (
              <AppToast variant={Color.Warning}>{t.p((x) => x.toasts.nothingFound)}</AppToast>
          )}
          <div ref={ref}></div>
        </div>
      </div>
    </BasicPage>
  </PageContainer>
  );
};
