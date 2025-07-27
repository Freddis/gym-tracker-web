import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {useOpenApiQuery} from 'src/frontend/hooks/useOpenApiQuery';
import {getArgusCheckinOptions, getArgusCheckinTypesOptions} from 'src/frontend/openapi-client/@tanstack/react-query.gen';
import {ArgusCheckinSubtype} from 'src/backend/model/ArgusCheckin/types/ArgusCheckinSubtype';
import {Pagination} from 'src/frontend/components/atoms/Pagination/Pagination';
import {getRouteApi} from '@tanstack/react-router';
import {ArgusCheckinType} from 'src/backend/model/ArgusCheckin/types/ArgusCheckinType';
import {ArgusStatusCheckinBlock} from './components/ArgusStatusCheckinBlock/ArgusStatusCheckinBlock';
import {ArgusCheckinBlock} from './components/ArgusCheckinBlock';
import {ArgusWeatherCheckinBlock} from './components/ArgusWeatherCheckinBlock/ArgusWeatherCheckinBlock';
import {ArgusWorkoutCheckinBlock} from './components/ArgusWorkoutCheckinBlock/ArgusWorkoutCheckinBlock';
import {ArgusWeightCheckinBlock} from './components/ArgusWeightCheckinBlock/ArgusWeightCheckinBlock';

const routeApi = getRouteApi('/argus/');

export function ArgusEntriesListPage() {
  const searchParams = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const entriesResponse = useOpenApiQuery(getArgusCheckinOptions, {
    query: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: searchParams.type as any,
      page: searchParams.page,
    },
  });
  const typesResponse = useOpenApiQuery(getArgusCheckinTypesOptions, {});
  if (entriesResponse.isLoading || typesResponse.isLoading) {
    return (
      <PageContainer>
        <div>Loading...</div>
      </PageContainer>
    );
  }

  const filterByType = (type?: string) => {
    navigate({
      search: {
        page: 1,
        type,
      }});
  };
  const onPageChanged = (page: number) => {
    navigate({
      search: {
        ...searchParams,
        page,
      }});
  };
  return (
    <PageContainer>
      <h2>Your entries:</h2>
      <div>
        <h3>Types:</h3>
        {<button key="all" onClick={() => filterByType()} style={{cursor: 'pointer'}}>All</button>}
        {typesResponse.data?.items.map((item) => (
          <button key={item} onClick={() => filterByType(item)} style={{margin: 5, cursor: 'pointer'}}>{item}</button>
        ))}
      </div>
      <h3>Data:</h3>
      <div style={{marginTop: '20px'}}>
        {entriesResponse.data?.items.map((item) => {
          switch (item.type) {
            case ArgusCheckinType.Weather:
              return <ArgusWeatherCheckinBlock key={item.id} item={item}/>;
            case ArgusCheckinType.Weight:
              return <ArgusWeightCheckinBlock key={item.id} item={item}/>;
            case ArgusCheckinType.Status:
              return <ArgusStatusCheckinBlock key={item.id} item={item}/>;
            default:
              switch (item.subtype) {
                case ArgusCheckinSubtype.Workout:
                  return <ArgusWorkoutCheckinBlock key={item.id} item={item}/>;
                default:
                  return <ArgusCheckinBlock key={item.id} item={item}/>;
              }
          }
        })}
      </div>
      {entriesResponse.data && <Pagination onPageChanged={onPageChanged} info={entriesResponse.data?.info} />}
    </PageContainer>
  );
}
