import {ChangeEventHandler, FC, useEffect, useState} from 'react';
import {WorkoutPlan} from '../../../utils/openapi-client';
import {AppLabel} from '../../atoms/AppLabel/AppLabel';
import {AppTextInput} from '../../atoms/AppTextInput/AppTextInput';

type Updated<T> = Omit<T, 'id'>
interface WorkoutPlanUpdateFormProps {
  item: Updated<WorkoutPlan>
  onUpdate: (dto: Updated<WorkoutPlan>) => void
}

export const WorkoutPlanUpdateForm: FC<WorkoutPlanUpdateFormProps> = (props) => {
  const [name, setName] = useState(props.item.name ?? '');
  const [description, setDescription] = useState(props.item.description ?? '');

  useEffect(() => {
  }, [props.item.name, props.item.description]);

  const onNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
    notify({name: e.target.value});
  };
  const onDescriptionChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDescription(e.target.value);
    notify({description: e.target.value});
  };

  const notify = (update: Partial<WorkoutPlan>) => {
    props.onUpdate({
      ...props.item,
      name,
      description,
      ...update,
    });
  };

  return (
    <>
      <div className="mb-5 flex flex-col items-start justify-start">
        <AppLabel>Name</AppLabel>
        <AppTextInput onChange={onNameChange} value={name}/>
      </div>
      <div className="mb-5 flex flex-col items-start">
        <AppLabel >Description</AppLabel>
        <AppTextInput onChange={onDescriptionChange} value={description}/>
      </div>
    </>
  );
};
