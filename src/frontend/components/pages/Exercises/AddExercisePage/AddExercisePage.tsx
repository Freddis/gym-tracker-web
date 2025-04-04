import {postExercisesMutation} from 'src/frontend/openapi-client/@tanstack/react-query.gen';
import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {useNavigate} from '@tanstack/react-router';

export function AddExercisePage() {
  const [name, setName] = useState('');
  const mutation = useMutation({
    ...postExercisesMutation(),
  });
  const navigation = useNavigate();
  const addExercise = async () => {
    const result = await mutation.mutateAsync({
      body: {
        name,
      },
    });
    if (!result.success) {
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
