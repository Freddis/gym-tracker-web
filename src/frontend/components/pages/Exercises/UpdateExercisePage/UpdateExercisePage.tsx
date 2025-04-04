import {
  deleteExercisesByIdMutation,
  getExercisesByIdOptions,
  patchExercisesByIdMutation,
  } from 'src/frontend/openapi-client/@tanstack/react-query.gen';
import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {getRouteApi, useNavigate} from '@tanstack/react-router';
import {Exercise} from 'src/frontend/openapi-client';
const routeApi = getRouteApi('/exercises/update/$exerciseId');

const EditExerciseForm = (props: {item: Exercise}) => {
  const navigation = useNavigate();
  const [name, setName] = useState(props.item.name);
  const [descriptiom, setDescription] = useState(props.item.description ?? '');
  const updateMutation = useMutation({
    ...patchExercisesByIdMutation(),
  });
  const deleteMutation = useMutation({
    ...deleteExercisesByIdMutation(),
  });
  const client = useQueryClient();
  const item = props.item;
  const saveExercise = async () => {
    const result = await updateMutation.mutateAsync({
      path: {
        id: item.id,
      },
      body: {
        name: name,
        description: descriptiom,
      },
    });
    if (!result.success) {
      // eslint-disable-next-line no-alert
      alert('Something went wrong');
      return;
    }

    await client.invalidateQueries({queryKey: ['exercises']});
    navigation({
      to: '/exercises',
    });
  };
  const back = () => {
    navigation({
      to: '/exercises',
    });
  };
  const deleteExercise = async () => {
    const result = await deleteMutation.mutateAsync({
      path: {
        id: item.id,
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

  return (
    <>
      <h2>Update Exercise</h2>
      <div>
        <label>Name</label>
        <input onChange={(e) => setName(e.target.value)} type="text" value={name}/>
      </div>
      <div>
        <label>Description</label>
        <div>
          <textarea onChange={(e) => setDescription(e.target.value)} value={descriptiom}/>
        </div>
      </div>
      <div style={{marginTop: 20}}>
        <button onClick={back}>Back</button>
        {item.userId !== null && <button onClick={saveExercise} style={{marginLeft: 20}}>Save</button>}
        {item.userId == null && (
          <div style={{color: 'red'}}>Cannot update built-in exercises</div>
        )}
         {item.userId !== null && (
          <button onClick={deleteExercise}>Delete Exercise</button>
        )}
      </div>
    </>
  );
};
export function UpdateExercisePage() {
  const params = routeApi.useParams();
  const id = !Number.isNaN(Number(params.exerciseId)) ? Number(params.exerciseId) : 0;
  const response = useQuery(getExercisesByIdOptions({
    path: {
      id,
    },
  }),
  );
  if (response.isLoading || !response.data) {
    return (
        <PageContainer>
          <div>Loading...</div>
        </PageContainer>
    );
  }
  return (
    <PageContainer>
      <EditExerciseForm item={response.data.item}/>
    </PageContainer>
  );
}
