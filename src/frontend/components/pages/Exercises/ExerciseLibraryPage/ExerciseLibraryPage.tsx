import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {FC, useEffect} from 'react';
import {ExerciseBlock} from './components/ExerciseBlock';
import {AppBlock} from '../../../atoms/AppBlock/AppBlock';
import {AppSpinner} from '../../../atoms/AppSpinner/AppSpinner';
import {AppLabel} from '../../../atoms/AppLabel/AppLabel';
import {AppSwitch} from '../../../atoms/AppSwitch/AppSwitch';
import {AppSearchInput} from '../../../atoms/AppSearchInput/AppSearchInput';
import {getRouteApi} from '@tanstack/react-router';
import {AppToast} from '../../../atoms/AppToast/AppToast';
import {Color} from '../../../../utils/design-system/types/Color';
import {useInfiniteQuery} from '@tanstack/react-query';
import {AppApiErrorDisplay} from '../../../atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {Equipment, getExercisesBuiltIn, GetExercisesBuiltInData, Muscle} from '../../../../utils/openapi-client';
import {useInView} from 'react-intersection-observer';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {AppPageHeading} from '../../../atoms/AppPageHeading/AppPageHeading';

const routeApi = getRouteApi('/exercises/');
export const ExerciseLibraryPage: FC = () => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.exercises);
  const searchParams = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const {ref, inView} = useInView({
    rootMargin: '50%',
  });
  const query: GetExercisesBuiltInData['query'] = {
    filter: searchParams.filter,
    muscle: searchParams.muscles, // <=diff and I want to keep it like that!
    equipment: searchParams.equipment,
  };
  const getResponse = () => {
    const response = useInfiniteQuery({
      queryFn: ({pageParam}) => getExercisesBuiltIn({
        query: {
          ...query,
          page: pageParam,
        },
      }),
      queryKey: [searchParams, 'exercises'],
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
    return response;
  };
  const response = getResponse();
  useEffect(() => {
    if (inView && response.hasNextPage && !response.isFetchingNextPage) {
      response.fetchNextPage();
    }
  }, [inView, response.hasNextPage, response.isFetchingNextPage, response.fetchNextPage]);

  const filterByEquipment = (equipment: Equipment, checked: boolean) => {
    navigate({
      search: {
        ...searchParams,
        equipment: checked ? equipment : undefined,
      },
    });
  };

  const filterByMuscle = (muscle: Muscle, checked: boolean) => {
    const existing = searchParams.muscles?.filter((x) => x !== muscle) ?? [];
    if (checked) {
      existing.push(muscle);
    }
    const muscles = existing.length > 0 ? existing : undefined;
    navigate({
      search: {
        ...searchParams,
        muscles,
      },
    });
  };
  const filterByName = (filter: string | null) => {
    navigate({search: {
      ...searchParams,
      filter: filter ?? undefined,
    }});
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
    <PageContainer>
      <div className="flex flex-col max-w-5xl w-full">
        <div className="w-full text-left mb-5">
          <AppPageHeading>{t(i18n.heading)}</AppPageHeading>
        </div>
        <div className="flex flex-col md:flex-row gap-5 items-start">
          <AppBlock className="hidden md:block w-full md:w-70 p-5">
            <AppLabel className="mb-2 block">{t(i18n.filter.labels.search)}</AppLabel>
            <div className="mb-5">
              <AppSearchInput debounce={1000} value={searchParams.filter} onSearch={filterByName}/>
            </div>
            <AppLabel className="mb-2 block">{t(i18n.filter.labels.equipment)}</AppLabel>
            <div className="mb-5 flex flex-col gap-2">
              {Object.values(Equipment).sort().map((x) => (
                <AppSwitch
                className="capitalize"
                key={x}
                label={x}
                checked={searchParams.equipment === x}
                onCheckedChange={(e) => filterByEquipment(x, e)}
                />
              ))}
            </div>
            <AppLabel className="mb-2 block">{t(i18n.filter.labels.muscles)}</AppLabel>
            <div className="mb-5 flex flex-col gap-2">
              {Object.values(Muscle).sort().map((x) => (
                <AppSwitch
                key={x}
                label={x}
                checked={searchParams.muscles?.includes(x) ?? false}
                onCheckedChange={(e) => filterByMuscle(x, e)}
                />
              ))}
            </div>
          </AppBlock>
          <div className="flex flex-col gap-5 grow w-full">
            {!response.isFetching && items.length === 0 && (
              <AppToast variant={Color.Danger}>{t(i18n.toasts.noExercisesFound)}</AppToast>
            )}
            {response.isLoading && <AppSpinner />}
            {items.map((item) => (
              <ExerciseBlock className="w-full" key={item.id} item={item} params={searchParams} />
            ))}
            <div ref={ref}></div>
            {response.isFetchingNextPage ? <AppSpinner/> : null}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
