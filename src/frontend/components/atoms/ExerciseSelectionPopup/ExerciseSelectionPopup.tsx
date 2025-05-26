
import {FC, useState, useContext} from 'react';
import {useOpenApiQuery} from 'src/frontend/hooks/useOpenApiQuery';
import {Exercise} from 'src/frontend/openapi-client';
import {getExercisesOptions} from 'src/frontend/openapi-client/@tanstack/react-query.gen';
import {ExerciseRow} from './components/ExerciseRow';
import {AuthContext} from '../../layout/AuthProvider/AuthContext';
import {AppTextInput} from '../AppTextInput/AppTextInput';
import {useAppPartialTranslation} from '../../../i18n/useAppPartialTranslation';
import {Switch} from '../Switch/Switch';
import {AppSpinner} from '../AppSpinner/AppSpinner';

export const ExerciseSelectionPopup: FC<{onSelect?: (exercise: Exercise)=> void}> = (props) => {
  const query = useOpenApiQuery(getExercisesOptions, {});
  const [search, setSearch] = useState<string>('');
  const {t, i18n} = useAppPartialTranslation((x) => x.layout.popups.exerciseSelection);
  const [ownLibrary, setOwnLibrary] = useState(false);
  const auth = useContext(AuthContext);
  const userId = auth.user?.id ?? 0;
  const searchFilter = (exercise: Exercise) => {
    if (ownLibrary && exercise.userId !== userId) {
      return false;
    }
    if (search.length >= 3 && !exercise.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
      return false;
    }
    return true;
  };
  return (
    <div className="flex flex-col items-stretch max-w-full max-h-full w-200 h-200">
      <h2 className="mb-10 text-center text-xl">{t(i18n.heading)}</h2>
      <AppTextInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t(i18n.labels.searchPlaceholder)}/>
      <div className="mt-5">
        <Switch onCheckedChange={(e) => setOwnLibrary(e)} label={t(i18n.labels.ownLibrary)} />
      </div>
      {query.isLoading && <AppSpinner />}
      {query.isSuccess && (
        <div className="mt-5 flex flex-col overflow-hidden">
          <div>{t(i18n.labels.exercises)}</div>
          <div className="h-200 overflow-scroll mt-2 bg-neutral-surface p-2">
            {query.data.items.filter(searchFilter).map((item) => (
              <ExerciseRow key={item.id} item={item} onSelect={props.onSelect}/>)
            )}
          </div>
        </div>
      )}
    </div>
  );
};
