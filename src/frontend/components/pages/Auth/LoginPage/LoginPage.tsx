import {useNavigate} from '@tanstack/react-router';
import {FC, useContext, useState} from 'react';
import {useResponseErrors} from '../../../../hooks/useResponseErrors';
import {useAppPartialTranslation} from '../../../../i18n/useAppPartialTranslation';
import {postAuthLogin, PostAuthLoginError} from '../../../../openapi-client';
import {AppButton} from '../../../atoms/AppButton/AppButton';
import {AppInputError} from '../../../atoms/AppInputError/AppInputError';
import {AppLabel} from '../../../atoms/AppLabel/AppLabel';
import {AppLink} from '../../../atoms/AppLink/AppLink';
import {AppTextInput} from '../../../atoms/AppTextInput/AppTextInput';
import {AuthContext} from '../../../layout/AuthProvider/AuthContext';
import {PageContainer} from '../../../layout/PageContainer/PageContainer';


export const LoginPage: FC = () => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.auth.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrors] = useResponseErrors();
  const login = async () => {
    const result = await postAuthLogin({
      body: {
        email,
        password,
      },
    });
    if (!result.error) {
      auth.login(result.data);
      navigate({to: '/workouts'});
      return;
    }
    const err: PostAuthLoginError = result.error;
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
    <PageContainer className="justify-center palette-neutral">
      <div className="flex flex-col">
        <div className="bg-normal text-on-neutral-surface p-10 min-w-xl rounded-sm">
          <h1 className="text-center text-xl">{t(i18n.heading)}</h1>
          <div className="flex flex-col gap-3 surface bg-">
            <AppLabel>{t(i18n.form.labels.email)}:</AppLabel>
            <AppTextInput
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <AppInputError error={errorMessage('email')} />
            <AppLabel>{t(i18n.form.labels.password)}:</AppLabel>
            <AppTextInput
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <AppInputError error={errorMessage('password')} />
          </div>
          <div className="mt-3 flex flex-row gap-10 justify-center">
            <AppLink to="/auth/register" className="text-accent ml-3">
              {t(i18n.form.buttons.forgotPassword)}
            </AppLink>
          </div>
          <div className="mt-10 flex flex-row gap-10 items-center justify-center">
            <AppButton className="w-30" onClick={login}>
              {t(i18n.form.buttons.signIn)}
            </AppButton>
          </div>
          <div className="grow mt-10 flex justify-center">
            <span>{t(i18n.registerCta)}</span>
            <AppLink to="/auth/register" className="text-accent ml-3">
              {t(i18n.form.buttons.register)}
            </AppLink>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
