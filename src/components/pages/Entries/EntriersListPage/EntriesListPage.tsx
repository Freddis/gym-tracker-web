import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {useOpenApiQuery} from 'src/lib/hooks/useOpenApiQuery';
import {getEntriesOptions, getEntriesTypesOptions} from 'src/lib/data/client/api/@tanstack/react-query.gen';
import {EntrySubtype} from 'src/server/model/Entry/types/EntrySubtype';
import {Workout} from 'src/components/pages/Entries/EntriersListPage/Entry/Workout/Workout';
import {Entry} from 'src/components/pages/Entries/EntriersListPage/Entry/Entry';
import {Pagination} from 'src/components/atoms/Pagination/Pagination';
import {getRouteApi} from '@tanstack/react-router';
import {EntryType} from 'src/server/model/Entry/types/EntryType';
import {Weather} from 'src/components/pages/Entries/EntriersListPage/Entry/Weather/Weather';
import {Weight} from 'src/components/pages/Entries/EntriersListPage/Entry/Weight/Weight';

const routeApi = getRouteApi('/feed');

export function EntriesListPage() {
  const searchParams = routeApi.useSearch();
  const navigate = routeApi.useNavigate();

  const entriesResponse = useOpenApiQuery(getEntriesOptions, {
    query: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: searchParams.type as any,
      page: searchParams.page,
    },
  });
  const typesResponse = useOpenApiQuery(getEntriesTypesOptions, {});
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
        ...searchParams,
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
            case EntryType.Weather:
              return <Weather key={item.id} item={item}/>;
            case EntryType.Weight:
              return <Weight key={item.id} item={item}/>;
            default: switch (item.subtype) {
              case EntrySubtype.Workout:
                return <Workout key={item.id} item={item}/>;
              default: return <Entry key={item.id} item={item}/>;
            }
          }
        })}
      </div>
      {entriesResponse.data && <Pagination onPageChanged={onPageChanged} info={entriesResponse.data?.info} />}
    </PageContainer>
  );
}
