import {getRouteApi} from '@tanstack/react-router';
import {FC, useEffect} from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';
import {Color} from '../../../../common/utils/design-system/types/Color';
import {useAppPartialTranslation} from '../../../utils/i18n/useAppPartialTranslation';
import {getWorkoutTypes} from '../../../../common/utils/openapi-client';
import {AppApiErrorDisplay} from '../../../../common/components/atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {AppSpinner} from '../../../../common/components/atoms/AppSpinner/AppSpinner';
import {AppToast} from '../../../../common/components/atoms/AppToast/AppToast';
import {PageContainer} from '../../../../common/components/layout/PageContainer/PageContainer';
import {useInView} from 'react-intersection-observer';
import {RouteLink} from '../../../../common/components/atoms/RouteLink/RouteLink';
import {WorkoutTypeBlock} from './WorkoutTypeBlock';
import {AppButton} from '../../../../common/components/atoms/AppButton/AppButton';
import {route, RouteId} from '../../../../common/utils/route';
import {BreadCrumbsBlock} from '../../blocks/BreadCrumbsBlock/BreadCrumbsBlock';
import {BreadCrumbs} from '../../blocks/BreadCrumbsBlock/types/BreadCrumbs';
import {BasicPage} from '../../../../common/components/layout/BasicPage/BasicPage';

const routeApi = getRouteApi('/workouts/types/');
export const WorkoutTypeListPage: FC = () => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.workoutTypes.list);
  const searchParams = routeApi.useSearch();
  const {ref, inView} = useInView({
    rootMargin: '50%',
  });
  const response = useInfiniteQuery({
    queryFn: ({pageParam}) => getWorkoutTypes({
      query: {
        page: pageParam,
      },
    }),
    queryKey: ['workout-types', searchParams],
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


  const apiError = response.data?.pages.find((x) => x.error !== undefined)?.error;
  if (response.isError || apiError) {
    return (
      <PageContainer>
        <AppApiErrorDisplay error={apiError?.error} />
      </PageContainer>
    );
  }
  const items = response.data?.pages.flatMap((x) => x.data?.items).filter((x) => x !== undefined) ?? [];
  const breadCrumbs: BreadCrumbs = [
    {label: translations.pages.activities.list.heading, url: route(RouteId.EntryList)},
    {label: t(i18n.heading), url: route(RouteId.WorkoutTypeList)},
  ];
  return (
    <PageContainer className="bg-main">
      <BasicPage>
        <BreadCrumbsBlock breadCrumbs={breadCrumbs} />
        <div className="flex flex-col gap-5 items-start w-full">
          <div className="flex flex-col gap-5 grow w-full">
            {response.isLoading && <AppSpinner />}
            {items.map((item) => <WorkoutTypeBlock key={item.id} item={item}/>)}
            {response.isFetchingNextPage ? <AppSpinner/> : null}
            {!response.isLoading && items.length === 0 && <AppToast variant={Color.Warning}>{t(i18n.toasts.noPlansFound)}</AppToast>}
            <div ref={ref}></div>
          </div>
          <div className="flex flex-row justify-center w-full">
            <RouteLink to={route(RouteId.WorkoutTypeCreate)}>
              <AppButton>{t(i18n.buttons.add)}</AppButton>
            </RouteLink>
          </div>
        </div>
      </BasicPage>
    </PageContainer>
  );
};
