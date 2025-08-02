import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {useState} from 'react';
import {useNavigate} from '@tanstack/react-router';
import {postExercises} from '../../../../utils/openapi-client';

export function AddExercisePage() {
  const [name, setName] = useState('');

  const navigation = useNavigate();
  const addExercise = async () => {
    const result = await postExercises({
      body: {
        name,
      },
    });
    if (!result.data) {
      // eslint-disable-next-line no-alert
      alert('Something went wrong');
      return;
    }
    navigation({
      to: '/exercises',
    });
  };
  const back = () => {
    navigation({
      to: '/exercises',
    });
  };
  return (
    <PageContainer>
      <h2>AddExercise</h2>
      <div>
        <label>Name</label>
        <input onChange={(e) => setName(e.target.value)} type="text"></input>
      </div>
      <div style={{marginTop: 20}}>
        <button onClick={back}>Back</button>
        <button onClick={addExercise} style={{marginLeft: 20}}>Add</button>
      </div>
    </PageContainer>
  );
}
