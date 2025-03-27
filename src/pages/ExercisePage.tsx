import {PageContainer} from '../components/PageContainer/PageContainer';
import {useOpenApiQuery} from 'src/lib/hooks/useOpenApiQuery';
import {getEntriesOptions} from 'src/lib/data/client/api/@tanstack/react-query.gen';
import {Entry} from 'src/components/Entry/Entry';

export function ExercisePage() {
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
      <h2>Exercise Library:</h2>
      <div style={{marginTop: '20px'}}>
        {response.data?.items.slice(0, 3).map((item) => {
          switch (item.subtype) {
            default: return <Entry key={item.id} item={item}/>;
          }
        })}
      </div>
      <button>Create Exercise</button>
    </PageContainer>
  );
}
