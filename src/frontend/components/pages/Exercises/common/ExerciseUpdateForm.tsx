import {FC, useEffect, useState} from 'react';
import {Exercise} from '../../../../utils/openapi-client';
import {FieldError, useResponseErrors} from '../../../../utils/useResponseErrors';
import {AppInputError} from '../../../atoms/AppInputError/AppInputError';
import {AppLabel} from '../../../atoms/AppLabel/AppLabel';
import {AppTextInput} from '../../../atoms/AppTextInput/AppTextInput';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';

interface ExerciseUpdateFormProps {
  item: Omit<Exercise, 'id'>
  onUpdate: (dto: Omit<Exercise, 'id'>) => void,
  errors: FieldError[],
}

export const ExerciseUpdateForm: FC<ExerciseUpdateFormProps> = (props) => {
  const {translations} = useAppPartialTranslation((x) => x.pages.exercises);
  const {getError} = useResponseErrors(props.errors);
  const [name, setName] = useState(props.item.name);
  const [description, setDescription] = useState(props.item.description ?? '');
  useEffect(() => {
    props.onUpdate({
      ...props.item,
      name,
      description,
    });
  }, [name, description]);

  return (
    <>
      <div>
         <AppLabel>{translations.utils.objects.exercise.fields.name}</AppLabel>
          <div>
            <AppTextInput onChange={(e) => setName(e.target.value)} value={name} className="w-100 max-w-full" />
          </div>
          <AppInputError data-testid="error-password" error={getError('name')} />
          <AppLabel>{translations.utils.objects.exercise.fields.description}</AppLabel>
          <div>
            <AppTextInput onChange={(e) => setDescription(e.target.value)} value={description} className="w-100 max-w-full" />
          </div>
          <AppInputError data-testid="error-password" error={getError('description')} />
      </div>
    </>
  );
};
