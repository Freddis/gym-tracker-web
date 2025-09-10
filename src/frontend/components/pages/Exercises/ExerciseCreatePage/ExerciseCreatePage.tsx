import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {useState} from 'react';
import {useNavigate} from '@tanstack/react-router';
import {postExercises} from '../../../../utils/openapi-client';
import {useResponseErrors} from '../../../../utils/useResponseErrors';
import {AppBlock} from '../../../atoms/AppBlock/AppBlock';
import {AppLink} from '../../../atoms/AppLink/AppLink';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {AppInputError} from '../../../atoms/AppInputError/AppInputError';
import {AppTextInput} from '../../../atoms/AppTextInput/AppTextInput';
import {AppLabel} from '../../../atoms/AppLabel/AppLabel';
import {AppButton} from '../../../atoms/AppButton/AppButton';

export function ExerciseCreatePage() {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.exercises);
  const [name, setName] = useState('');
  const {showToastsAndSetErrors, getError} = useResponseErrors();
  const navigation = useNavigate();
  const saveButtonClicked = async () => {
    const result = await postExercises({
      body: {
        name,
      },
    });
    if (showToastsAndSetErrors(result)) {
      return;
    }
    navigation({
      to: '/exercises',
    });
  };
  return (
    <PageContainer>
      <div className="flex flex-col max-w-5xl w-full">
        <div className="mb-5 -mt-5">
          <AppLink to="/entries">{t(i18n.list.heading)}</AppLink>
          <span className="ml-2">&gt;&gt;</span>
          <span className="ml-2">{t(i18n.create.heading)}</span>
        </div>
        <AppBlock className="max-w-5xl">
          <div>
            <AppLabel>{translations.utils.objects.exercise.fields.name}</AppLabel>
            <div>
              <AppTextInput onChange={(e) => setName(e.target.value)} type="text" className="w-100 max-w-full" />
            </div>
            <AppInputError data-testid="error-password" error={getError('name')} />
          </div>
          <div className="mt-5 border-b-1 border-neutral-on-surface"/>
          <div className="mt-5 flex flex-row">
            <AppLink to="/exercises">{translations.utils.generic.buttons.back}</AppLink>
            <div className="grow flex flex-row-reverse gap-2">
              <AppButton onClick={saveButtonClicked}>{translations.utils.generic.buttons.save}</AppButton>
            </div>
          </div>
        </AppBlock>
      </div>
    </PageContainer>
  );
}
