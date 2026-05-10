import {FC, useEffect, useState} from 'react';
import {Exercise} from '../../../../../common/utils/openapi-client';
import {FieldError, useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {AppInputError} from '../../../../../common/components/atoms/AppInputError/AppInputError';
import {AppLabel} from '../../../../../common/components/atoms/AppLabel/AppLabel';
import {AppTextInput} from '../../../../../common/components/atoms/AppTextInput/AppTextInput';
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
          <div className="w-100 max-w-full">
            <AppTextInput onChange={(e) => setName(e.target.value)} value={name} />
          </div>
          <AppInputError data-testid="error-password" error={getError('name')} />
          <AppLabel>{translations.utils.objects.exercise.fields.description}</AppLabel>
          <div className="w-100 max-w-full">
            <AppTextInput onChange={(e) => setDescription(e.target.value)} value={description} />
          </div>
          <AppInputError data-testid="error-password" error={getError('description')} />
      </div>
    </>
  );
};
