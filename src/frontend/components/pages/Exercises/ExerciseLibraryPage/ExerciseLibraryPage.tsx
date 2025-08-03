import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {FC, useContext, useEffect} from 'react';
import {ExerciseBlock} from './components/ExerciseBlock';
import {AppLink} from '../../../atoms/AppLink/AppLink';
import {AppBlock} from '../../../atoms/AppBlock/AppBlock';
import {AppSpinner} from '../../../atoms/AppSpinner/AppSpinner';
import {AppLabel} from '../../../atoms/AppLabel/AppLabel';
import {AppSwitch} from '../../../atoms/AppSwitch/AppSwitch';
import {AuthContext} from '../../../layout/AuthProvider/AuthContext';
import {Conditional} from '../../../layout/Header/Header';
import {AppSearchInput} from '../../../atoms/AppSearchInput/AppSearchInput';
import {getRouteApi} from '@tanstack/react-router';
import {AppToast} from '../../../atoms/AppToast/AppToast';
import {Color} from '../../../../utils/design-system/types/Color';
import {useInfiniteQuery} from '@tanstack/react-query';
import {AppApiErrorDisplay} from '../../../atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {Equipment, getExercisesBuiltIn, GetExercisesBuiltInData, Muscle} from '../../../../utils/openapi-client';
import {useInView} from 'react-intersection-observer';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';

const routeApi = getRouteApi('/exercises/');
export const ExerciseLibraryPage: FC = () => {
  const auth = useContext(AuthContext);
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
    <PageContainer >
      <div className="max-w-5xl w-full flex flex-row gap-5 items-start ">
        <AppBlock className="w-70 p-5">
          <AppLabel className="mb-2">{t(i18n.filter.labels.search)}</AppLabel>
          <div className="mb-5">
            <AppSearchInput debounce={1000} value={searchParams.filter} onSearch={filterByName}/>
          </div>
           <AppLabel className="mb-2">{t(i18n.filter.labels.equipment)}</AppLabel>
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
          <AppLabel className="mb-2">{t(i18n.filter.labels.muscles)}</AppLabel>
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
        <div className="max-w-2xl w-full">
          <div className="flex mb-5">
            <h1 className="text-xl">{t(i18n.heading)}</h1>
            <Conditional condition={!!auth.user}>
              <div className="grow flex flex-row-reverse">
                <AppLink to="/exercises/create">{t(i18n.buttons.addExercise)}</AppLink>
              </div>
            </Conditional>
          </div>
          <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-5">
                  {response.isLoading && <AppSpinner />}
                  {items.map((item) => (
                    <ExerciseBlock key={item.id} item={item} params={searchParams} />
                  ))}
                  <div ref={ref}></div>
                  {response.isFetchingNextPage ? <AppSpinner/> : null}
              </div>
            {!response.isFetching && items.length === 0 && (
              <AppToast variant={Color.Danger}>{t(i18n.toasts.noExercisesFound)}</AppToast>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
