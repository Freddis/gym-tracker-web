import {getRouteApi} from '@tanstack/react-router';
import {FC, useEffect} from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';
import {Color} from '../../../utils/design-system/types/Color';
import {useAppPartialTranslation} from '../../../utils/i18n/useAppPartialTranslation';
import {EntryType, getEntries} from '../../../utils/openapi-client';
import {AppApiErrorDisplay} from '../../atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {AppSpinner} from '../../atoms/AppSpinner/AppSpinner';
import {AppToast} from '../../atoms/AppToast/AppToast';
import {PageContainer} from '../../layout/PageContainer/PageContainer';
import {EntryBlock} from './components/EntryBlock';
import {AppPageHeading} from '../../atoms/AppPageHeading/AppPageHeading';
import {useInView} from 'react-intersection-observer';
import {AppBlock} from '../../atoms/AppBlock/AppBlock';
import {AppSwitch} from '../../atoms/AppSwitch/AppSwitch';
import {AppLabel} from '../../atoms/AppLabel/AppLabel';

const routeApi = getRouteApi('/feed/');
export const FeedPage: FC = () => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.feed);
  const {i18n: i18nEntryTypes} = useAppPartialTranslation((x) => x.utils.objects.entryType);
  const searchParams = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const {ref, inView} = useInView({
    rootMargin: '50%',
  });
  const response = useInfiniteQuery({
    queryFn: ({pageParam}) => getEntries({
      query: {
        page: pageParam,
        type: searchParams.type,
      },
    }),
    queryKey: ['feed', searchParams],
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

  const filterByType = (type: EntryType, checked: boolean) => {
    navigate({
      search: {
        ...searchParams,
        type: checked ? type : undefined,
      },
    });
  };
  const apiError = response.data?.pages.find((x) => x.error !== undefined)?.error;
  if (response.isError || apiError) {
    return (
      <PageContainer>
        <AppApiErrorDisplay error={apiError?.error} />
      </PageContainer>
    );
  }
  const items = response.data?.pages.flatMap((x) => x.data?.items).filter((x) => x !== undefined) ?? [];
  return (
    <PageContainer className="bg-main">
      <div className="flex flex-col max-w-5xl w-full">
        <div className="w-full text-left mb-5">
          <AppPageHeading>{t(i18n.heading)}</AppPageHeading>
        </div>
        <div className="flex flex-col md:flex-row gap-5 items-start">
          <AppBlock className="w-full md:w-70">
            <AppLabel className="mb-2 block">{t(i18n.filter.labels.type)}</AppLabel>
            <div className="mb-5 flex flex-col gap-2">
              {Object.values(EntryType).map((x) => (
                <AppSwitch
                className="capitalize"
                key={x}
                label={t(i18nEntryTypes[x])}
                checked={searchParams.type === x}
                onCheckedChange={(e) => filterByType(x, e)}
                ></AppSwitch>
              ))}
            </div>
          </AppBlock>
          <div className="flex flex-col gap-5 grow w-full">
            {response.isLoading && <AppSpinner />}
            {items.map((item) => <EntryBlock key={item.id} entry={item}/>)}
            {response.isFetchingNextPage ? <AppSpinner/> : null}
            {!response.isLoading && items.length === 0 && <AppToast variant={Color.Warning}>{t(i18n.toasts.noActivitiesFound)}</AppToast>}
            <div ref={ref}></div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
