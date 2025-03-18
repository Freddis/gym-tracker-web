import {PageContainer} from '../components/PageContainer/PageContainer';
import {useOpenApiQuery} from 'src/lib/hooks/useOpenApiQuery';
import {getEntriesOptions} from 'src/lib/data/client/api/@tanstack/react-query.gen';
import {EntrySubtype} from 'src/server/model/Entry/types/EntrySubtype';
import {Workout} from 'src/components/Entry/Workout/Workout';
import {Entry} from 'src/components/Entry/Entry';

export function HomePage() {
  const response = useOpenApiQuery(getEntriesOptions, {});
  if (response.isLoading) {
    return (
      <PageContainer>
        <div>Loading...</div>
      </PageContainer>
    );
  }
  return (
    <PageContainer>
      <h2>Your entries:</h2>
      <div style={{marginTop: '20px'}}>
        {response.data?.items.map((item) => {
          switch (item.subtype) {
            case EntrySubtype.Workout:
              return <Workout key={item.id} item={item}/>;
            default: return <Entry key={item.id} item={item}/>;
          }
        })}
      </div>
    </PageContainer>
  );
}
