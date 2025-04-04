import {Checkbox, FormControlLabel, SxProps, TextField, TextFieldProps} from '@mui/material';
import {FC, CSSProperties, useState, useContext} from 'react';
import {useOpenApiQuery} from 'src/frontend/hooks/useOpenApiQuery';
import {Exercise} from 'src/frontend/openapi-client';
import {getExercisesOptions} from 'src/frontend/openapi-client/@tanstack/react-query.gen';
import {ExerciseRow} from './components/ExerciseRow';
import {AuthContext} from '../../layout/AuthProvider/AuthContext';

export const ExerciseSelectionPopup: FC<{onSelect?: (exercise: Exercise)=> void}> = (props) => {
  const query = useOpenApiQuery(getExercisesOptions, {});
  const [search, setSearch] = useState<string|null>(null);
  const [ownLibrary, setOwnLibrary] = useState(false);
  const auth = useContext(AuthContext);
  const userId = auth.user?.id ?? 0;
  const containerStyle: CSSProperties = {
    width: 800,
    maxWidth: '100%',
    height: 800,
    maxHeight: '100%',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  };
  const listStyle: CSSProperties = {
    height: 200,
    overflow: 'scroll',
    marginTop: 10,
    background: 'black',
    padding: 10,
    flex: 1,
  };
  const searchSx: SxProps = {
    color: 'white',
    input: {
      color: 'white',
      background: 'black',
      padding: '10px',
      borderRadius: '5px',
    },
  };
  const textFieldProps: TextFieldProps = {
    onChange: (e) => {
      const trimmed = e.target.value.trim();
      if (trimmed.length < 3) {
        setSearch(null);
        return;
      }
      setSearch(trimmed);
    },
    value: search,
    placeholder: 'Search here...',
    variant: 'standard',
    sx: searchSx,
  };

  const searchFilter = (exercise: Exercise) => {
    if (ownLibrary && exercise.userId !== userId) {
      return false;
    }
    if (search !== null && !exercise.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
      return false;
    }
    return true;
  };

  return (
    <div style={containerStyle}>
    <h2>Select Exercise</h2>
    <TextField {...textFieldProps} />
    <div>
    <FormControlLabel control={
      <Checkbox onChange={(e) => setOwnLibrary(e.target.checked)} color={'error'} sx={{color: 'white'}}></Checkbox>
    } label={'Own Library'} />
    </div>
    {query.isLoading && (
      <div style={{marginTop: 20}}>Loading exercises...</div>
    )}
    {query.isSuccess && (
      <div style={{marginTop: 20, display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
        <div>Exercises:</div>
        <div style={listStyle}>
        {query.data.items.filter(searchFilter).map((item) => <ExerciseRow key={item.id} item={item} onSelect={props.onSelect}/>)}
        </div>
      </div>
    )}
    </div>
  );
};
