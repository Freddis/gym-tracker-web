import {getRouteApi} from '@tanstack/react-router';
import {FC, useEffect} from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';
import {Color} from '../../../utils/design-system/types/Color';
import {useAppPartialTranslation} from '../../../utils/i18n/useAppPartialTranslation';
import {getWorkoutPlans} from '../../../utils/openapi-client';
import {AppApiErrorDisplay} from '../../atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {AppSpinner} from '../../atoms/AppSpinner/AppSpinner';
import {AppToast} from '../../atoms/AppToast/AppToast';
import {PageContainer} from '../../layout/PageContainer/PageContainer';
import {useInView} from 'react-intersection-observer';
import {AppLink} from '../../atoms/AppLink/AppLink';
import {WorkoutPlanBlock} from './WorkoutPlanBlock';
import {AppButton} from '../../atoms/AppButton/AppButton';

const routeApi = getRouteApi('/workouts/plans/');
export const WorkoutPlanListPage: FC = () => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.workoutPlans.list);
  const searchParams = routeApi.useSearch();
  const {ref, inView} = useInView({
    rootMargin: '50%',
  });
  const response = useInfiniteQuery({
    queryFn: ({pageParam}) => getWorkoutPlans({
      query: {
        page: pageParam,
      },
    }),
    queryKey: ['workout-plans', searchParams],
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
  return (
    <PageContainer className="bg-main">
      <div className="flex flex-col max-w-5xl w-full">
      <div className="mb-5 -mt-5">
        <AppLink to="/entries">{translations.pages.activities.list.heading}</AppLink>
        <span className="ml-2">&gt;&gt;</span>
        <span className="ml-2">{t(i18n.heading)}</span>
      </div>
        <div className="flex flex-col gap-5 items-start w-full">
          <div className="flex flex-col gap-5 grow w-full">
            {response.isLoading && <AppSpinner />}
            {items.map((item) => <WorkoutPlanBlock key={item.id} plan={item}/>)}
            {response.isFetchingNextPage ? <AppSpinner/> : null}
            {!response.isLoading && items.length === 0 && <AppToast variant={Color.Warning}>{t(i18n.toasts.noPlansFound)}</AppToast>}
            <div ref={ref}></div>
          </div>
          <div className="flex flex-row justify-center w-full">
            <AppLink to="/workouts/plans/create">
              <AppButton>{t(i18n.heading)}</AppButton>
            </AppLink>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
