import {getRouteApi} from '@tanstack/react-router';
import {FC, useEffect} from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';
import {Color} from '../../../utils/design-system/types/Color';
import {useAppPartialTranslation} from '../../../utils/i18n/useAppPartialTranslation';
import {getEntries} from '../../../utils/openapi-client';
import {AppApiErrorDisplay} from '../../atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {AppSpinner} from '../../atoms/AppSpinner/AppSpinner';
import {AppToast} from '../../atoms/AppToast/AppToast';
import {PageContainer} from '../../layout/PageContainer/PageContainer';
import {EntryBlock} from './components/EntryBlock';
import {AppPageHeading} from '../../atoms/AppPageHeading/AppPageHeading';
import {useInView} from 'react-intersection-observer';

const routeApi = getRouteApi('/feed/');
export const FeedPage: FC = () => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.feed);
  const searchParams = routeApi.useSearch();
  const {ref, inView} = useInView({
    rootMargin: '50%',
  });
  const response = useInfiniteQuery({
    queryFn: ({pageParam}) => getEntries({
      query: {
        page: pageParam,
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

  if (response.isLoading) {
    return (
      <PageContainer className="bg-main">
        <AppSpinner/>
      </PageContainer>
    );
  }
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
      <div className="flex flex-col gap-5">
        <div className="w-full text-left mb-5">
          <AppPageHeading>{t(i18n.heading)}</AppPageHeading>
        </div>
        {items.map((item) => <EntryBlock key={item.id} entry={item}/>)}
        <div ref={ref}></div>
        {response.isFetchingNextPage ? <AppSpinner/> : null}
        {items.length === 0 && <AppToast variant={Color.Warning}>No Acitivities Found</AppToast>}
      </div>
    </PageContainer>
  );
};
