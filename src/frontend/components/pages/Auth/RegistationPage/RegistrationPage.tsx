import {useNavigate} from '@tanstack/react-router';
import {FC, useContext, useState} from 'react';
import {AppButton} from '../../../atoms/AppButton/AppButton';
import {AppLabel} from '../../../atoms/AppLabel/AppLabel';
import {AppTextInput} from '../../../atoms/AppTextInput/AppTextInput';
import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {AppLink} from '../../../atoms/AppLink/AppLink';
import {AuthContext} from '../../../layout/AuthProvider/AuthContext';
import {useResponseErrors} from '../../../../utils/useResponseErrors';
import {AppInputError} from '../../../atoms/AppInputError/AppInputError';
import {postAuthRegister, PostAuthRegisterError} from '../../../../utils/openapi-client';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';

export const RegistrationPage: FC = () => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.auth.registration);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrors] = useResponseErrors();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const register = async () => {
    const result = await postAuthRegister({
      body: {
        name,
        email,
        password,
        passwordConfirmation,
      },
    });
    if (!result.error) {
      auth.login(result.data);
      navigate({to: '/workouts'});
      return;
    }
    const err: PostAuthRegisterError = result.error;
    if (err.error.code === 'ValidationFailed') {
      setErrors(err.error.fieldErrors ?? []);
    } else if (err.error.code === 'ActionError') {
          // eslint-disable-next-line no-alert
      alert(err.error.humanReadable);
    } else {
          // eslint-disable-next-line no-alert
      alert('Something went wrong:');
    }
  };

  return (
    <PageContainer className="justify-center bg-main">
      <div className="bg-surface text-on-surface p-10 min-w-xl rounded-sm">
        <h1 className="text-center text-xl">{t(i18n.heading)}</h1>
        <div className="flex flex-col gap-3">
          <AppLabel>{t(i18n.form.labels.name)}</AppLabel>
          <AppTextInput onChange={(e) => setName(e.target.value)} value={name}/>
          <AppInputError error={errorMessage('name')} />
        </div>
        <div className="flex flex-col gap-3">
          <AppLabel>{t(i18n.form.labels.email)}</AppLabel>
          <AppTextInput onChange={(e) => setEmail(e.target.value)} value={email}/>
          <AppInputError error={errorMessage('email')} />
        </div>
        <div className="flex flex-col gap-3">
          <AppLabel>{t(i18n.form.labels.password)}</AppLabel>
          <AppTextInput type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
          <AppInputError error={errorMessage('password')} />
        </div>
        <div className="flex flex-col gap-3">
          <AppLabel>{t(i18n.form.labels.passwordConfirmation)}</AppLabel>
          <AppTextInput type="password" onChange={(e) => setPasswordConfirmation(e.target.value)} value={passwordConfirmation} />
            <AppInputError error={errorMessage('passwordConfirmation')} />
        </div>
          <div className="flex flex-row mt-5">
            <AppLink to="/auth/login" style={{marginLeft: 20}}>{t(i18n.form.buttons.signIn)}</AppLink>
            <div className="grow flex flex-row-reverse">
              <AppButton onClick={register}>{t(i18n.form.buttons.register)}</AppButton>
            </div>
          </div>
      </div>
    </PageContainer>
  );
};
