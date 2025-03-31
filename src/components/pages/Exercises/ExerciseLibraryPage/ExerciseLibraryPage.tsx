import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {useOpenApiQuery} from 'src/lib/hooks/useOpenApiQuery';
import {getExercisesOptions} from 'src/lib/data/client/api/@tanstack/react-query.gen';
import {Exercise} from 'src/types/Exercise';
import {useState} from 'react';
import {Link} from '@tanstack/react-router';
import {ExerciseBlock} from './ExerciseBlock';

export function ExerciseLibraryPage() {
  const response = useOpenApiQuery(getExercisesOptions, {});
  const [searchName, setSearchName] = useState<string|null>(null);
  if (response.isLoading || !response.data) {
    return (
      <PageContainer>
        <div>Loading...</div>
      </PageContainer>
    );
  }
  const setSearchValue = (value: string) => {
    const trimmed = value.trim();
    if (trimmed.length < 3) {
      setSearchName(null);
      return;
    }
    setSearchName(value.trim());
  };

  const map = new Map<number, Exercise[]>();
  const primaryExercises: Exercise[] = [];
  const personalExercises: Exercise[] = [];
  for (const exercise of response.data.items) {
    if (searchName !== null && !exercise.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase())) {
      continue;
    }
    if (exercise.userId !== null) {
      personalExercises.push(exercise);
      continue;
    }

    if (exercise.parentExerciseId == null) {
      if (searchName !== null && !exercise.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase())) {
        continue;
      }
      primaryExercises.push(exercise);
      continue;
    }

    const existing = map.get(exercise.parentExerciseId) ?? [];
    existing.push(exercise);
    map.set(exercise.parentExerciseId, existing);
  }
  const items = primaryExercises.map((item) => ({
    ...item,
    variations: map.get(item.id),
  })
  );

  return (
    <PageContainer>
      <h2>Search</h2>
      <div>
        <input type="text" onChange={(e) => setSearchValue(e.target.value)} />
      </div>
      <h2>Personal Library</h2>
      <Link to="/exercises/create" style={{color: 'white', textDecoration: 'none', cursor: 'pointer'}}>Add Exercise</Link>
      {personalExercises.map((item) => <ExerciseBlock key={item.id} item={item}/>)}
      <h2>Built-In Library:</h2>
      <div style={{marginTop: '20px'}}>
        {items.length === 0 && (
          <div>No exercises found</div>
        )}
        {items.map((item) => <ExerciseBlock key={item.id} item={item}/>)}
      </div>
    </PageContainer>
  );
}
