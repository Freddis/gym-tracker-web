import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {useOpenApiQuery} from 'src/frontend/hooks/useOpenApiQuery';
import {getExercisesOptions} from 'src/frontend/openapi-client/@tanstack/react-query.gen';
import {useState} from 'react';
import {ExerciseBlock} from './ExerciseBlock';
import {Exercise} from 'src/frontend/openapi-client';
import {AppLink} from '../../../atoms/AppLink/AppLink';
import {AppTextInput} from '../../../atoms/AppTextInput/AppTextInput';
import {AppBlock} from '../../../atoms/AppBlock/AppBlock';
import {AppSpinner} from '../../../atoms/AppSpinner/AppSpinner';
import {AppLabel} from '../../../atoms/AppLabel/AppLabel';
import {AppSwitch} from '../../../atoms/AppSwitch/AppSwitch';

export function ExerciseLibraryPage() {
  const response = useOpenApiQuery(getExercisesOptions, {});
  const [searchName, setSearchName] = useState<string|null>(null);
  console.log(response);
  if (response.isError) {
    return (
      <PageContainer>
        <div>Error</div>
      </PageContainer>
    );
  }
  if (response.isLoading || !response.data) {
    return (
      <PageContainer>
        <AppSpinner/>
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
      <div className="flex flex-row gap-5 items-start ">
        <AppBlock className="w-70 p-5">
          <AppLabel className="mb-2">Search:</AppLabel>
          <div className="mb-5">
            <AppTextInput onChange={(e) => setSearchValue(e.target.value)} />
          </div>
          <AppLabel className="mb-2">Muscle Groups:</AppLabel>
          <div className="mb-5 flex flex-col gap-2">
            <AppSwitch label="Abdominals"/>
            <AppSwitch label="Shoulders" />
            <AppSwitch label="Biceps"/>
            <AppSwitch label="Triceps"/>
            <AppSwitch label="Forearms"/>
            <AppSwitch label="Quadriceps"/>
            <AppSwitch label="Hamstrings"/>
            <AppSwitch label="Calves"/>
            <AppSwitch label="Glutes"/>
            <AppSwitch label="Abductors"/>
            <AppSwitch label="Adductors"/>
            <AppSwitch label="Lats"/>
            <AppSwitch label="Traps"/>
            <AppSwitch label="Lower Back"/>
            <AppSwitch label="Upper Back"/>
            <AppSwitch label="Chest"/>
            <AppSwitch label="Neck"/>
          </div>
        </AppBlock>
        <div>
          <div className="flex mb-5">
            <h1 className="text-xl">Built-In Library</h1>
            <div className="grow flex flex-row-reverse">
              <AppLink to="/exercises/create">Add Exercise</AppLink>
            </div>
          </div>
          <div className="w-2xl min-w-max flex flex-col gap-5">
            {items.length === 0 && (
              <div>No exercises found</div>
            )}
            {items.map((item) => <ExerciseBlock key={item.id} item={item}/>)}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
