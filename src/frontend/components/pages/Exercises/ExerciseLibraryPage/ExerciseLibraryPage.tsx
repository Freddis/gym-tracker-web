import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {useOpenApiQuery} from 'src/frontend/hooks/useOpenApiQuery';
import {getExercisesBuiltInOptions, getExercisesOptions} from 'src/frontend/openapi-client/@tanstack/react-query.gen';
import {FC, useContext, useRef} from 'react';
import {ExerciseBlock} from './ExerciseBlock';
import {AppLink} from '../../../atoms/AppLink/AppLink';
import {AppBlock} from '../../../atoms/AppBlock/AppBlock';
import {AppSpinner} from '../../../atoms/AppSpinner/AppSpinner';
import {AppLabel} from '../../../atoms/AppLabel/AppLabel';
import {AppSwitch} from '../../../atoms/AppSwitch/AppSwitch';
import {AuthContext} from '../../../layout/AuthProvider/AuthContext';
import {Conditional} from '../../../layout/Header/Header';
import {GetExercisesBuiltInData} from '../../../../openapi-client';
import {useVirtualizer} from '@tanstack/react-virtual';
import {AppSearchInput} from '../../../atoms/AppSearchInput/AppSearchInput';
import {Muscle} from '../../../../../common/enums/Muscle';
import {getRouteApi} from '@tanstack/react-router';
import {AppToast} from '../../../atoms/AppToast/AppToast';
import {Color} from '../../../../enums/Color';

const routeApi = getRouteApi('/exercises/');

export const ExerciseLibraryPage: FC = () => {
  const auth = useContext(AuthContext);
  const searchParams = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const parentRef = useRef(null);
  const getResponse = () => {
    const query: GetExercisesBuiltInData['query'] = {
      filter: searchParams.filter,
      muscle: searchParams.muscles,
    };
    if (auth.user) {
      return useOpenApiQuery(getExercisesOptions, {query, queryKey: [searchParams]});
    }
    return useOpenApiQuery(getExercisesBuiltInOptions, {query, queryKey: [searchParams]});
  };
  const response = getResponse();
  const rowVirtualizer = useVirtualizer({
    count: response.data?.items.length ?? 0,
    getScrollElement: () => parentRef.current, //typeof window !== 'undefined' ? window : null,
    estimateSize: () => 144,
    overscan: 10,
  });
  const filterByMuscle = (muscle: Muscle, checked: boolean) => {
    const existing = searchParams.muscles?.filter((x) => x !== muscle) ?? [];
    if (checked) {
      existing.push(muscle);
    }
    const muscles = existing.length > 0 ? existing : undefined;
    console.log(muscles);
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
  if (response.isError) {
    return (
      <PageContainer>
        <div>Error</div>
      </PageContainer>
    );
  }
  const items = response.data?.items ?? [];
  return (
    <PageContainer >
      <div className="max-w-5xl w-full flex flex-row gap-5 items-start " ref={parentRef}>
        <AppBlock className="w-70 p-5">
          <AppLabel className="mb-2">Search:</AppLabel>
          <div className="mb-5">
            <AppSearchInput debounce={1000} value={searchParams.filter} onSearch={filterByName}/>
          </div>
          <AppLabel className="mb-2">Muscle Groups:</AppLabel>
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
            <h1 className="text-xl">Built-In Library</h1>
            <Conditional condition={!!auth.user}>
              <div className="grow flex flex-row-reverse">
                <AppLink to="/exercises/create">Add Exercise</AppLink>
              </div>
            </Conditional>
          </div>
          <div className="flex flex-col gap-5">
            {response.isFetching && <AppSpinner />}
            {!response.isFetching && (
              <div className="flex flex-col gap-5">
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const item = items[virtualRow.index];
                  if (!item) {
                    throw new Error('Something went wrong');
                  }
                  return <ExerciseBlock key={item.id} item={item} />;
                })}
               </div>
            )}
            {!response.isFetching && items.length === 0 && (
              <AppToast variant={Color.Danger}>No exercises found</AppToast>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
