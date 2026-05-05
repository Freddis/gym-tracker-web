import {useInfiniteQuery} from '@tanstack/react-query';
import {FC, useState, useEffect, ChangeEventHandler} from 'react';
import {useInView} from 'react-intersection-observer';
import {AppSpinner} from '../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {AppSwitch} from '../../../../../common/components/atoms/AppSwitch/AppSwitch';
import {AppTextInput} from '../../../../../common/components/atoms/AppTextInput/AppTextInput';
import {AppToast} from '../../../../../common/components/atoms/AppToast/AppToast';
import {Color} from '../../../../../common/utils/design-system/types/Color';
import {Food} from '../../../../../common/utils/openapi-client';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {api} from '../../../../../common/utils/api';
import {FoodRow} from './components/FoodRow/FoodRow';
interface IngredientSelectionPopupProps {
  onSelect?: (exercise: Food)=> void;
  exclude?: Food[];
}
export const IngredientSelectionPopup: FC<IngredientSelectionPopupProps> = (props) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.layout.popups.foodSelection);
  const [search, setSearch] = useState<string>('');
  const [ownLibrary, setOwnLibrary] = useState(false);
  const {ref, inView} = useInView({
    rootMargin: '50%',
  });
  const response = useInfiniteQuery({
    queryFn: ({pageParam}) => {
      return api.getFoodList({
        query: {
          page: pageParam,
          search: search,
        },
      });
    },
    queryKey: ['exercises', search, ownLibrary],
    getNextPageParam: (lastPage) => {
      if (!lastPage.data) {
        return null;
      }
      const left = lastPage.data.info.count - lastPage.data.info.page * lastPage.data.info.pageSize;
      if (left <= 0) {
        return null;
      }
      return lastPage.data.info.page + 1;
    },
    initialPageParam: 1,
  });
  useEffect(() => {
    if (inView && response.hasNextPage && !response.isFetchingNextPage) {
      response.fetchNextPage();
    }
  }, [inView, response.hasNextPage, response.isFetchingNextPage, response.fetchNextPage]);

  const onSearchInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
  };

  const flatResponse = response.data?.pages.flatMap((x) => x.data?.items).filter((x) => x !== undefined) ?? [];
  const items = flatResponse.filter((x) => !props.exclude?.some((y) => y.id === x.id));
  return (
    <div className="flex flex-col items-stretch max-w-full max-h-full w-200 h-200">
      <h2 className="mb-10 text-center text-xl">{t(i18n.heading)}</h2>
      <AppTextInput value={search} onChange={onSearchInputChange} placeholder={t(i18n.labels.searchPlaceholder)}/>
      <div className="mt-5">
        <AppSwitch onCheckedChange={(e) => setOwnLibrary(e)} label={t(i18n.labels.ownLibrary)} />
      </div>
      {response.isLoading && <AppSpinner />}
      {response.isSuccess && (
        <div className="mt-5 flex flex-col overflow-hidden">
          <div>{t(i18n.labels.food)}</div>
          <div className="h-200 overflow-scroll mt-2 bg-main p-2 rounded-xs">
            {items.map((item) => (
              <FoodRow key={item.id} item={item} onSelect={props.onSelect}/>)
            )}
            {response.isFetchingNextPage ? <AppSpinner/> : null}
            {!response.isLoading && items.length === 0 && <AppToast variant={Color.Warning}>{t(i18n.toasts.noFoodFound)}</AppToast>}
            <div ref={ref}></div>
          </div>
        </div>
      )}
    </div>
  );
};
