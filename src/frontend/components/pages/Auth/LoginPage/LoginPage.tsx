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
import {AppBlock} from '../../../atoms/AppBlock/AppBlock';
import {AppSpinner} from '../../../atoms/AppSpinner/AppSpinner';


export const LoginPage: FC = () => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.auth.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrors] = useResponseErrors();
  const loginButtonPress = async () => {
    setLoggingIn(true);
    setTimeout(login, 0);
  };
  const login = async () => {
    const result = await postAuthLogin({
      body: {
        email,
        password,
      },
    });
    setLoggingIn(false);
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
    <PageContainer className="justify-center bg-main text-main">
      <div className="flex flex-col">
        <AppBlock className="bg-surface text-on-surface p-10 min-w-xl rounded-sm">
          <h1 className="text-center text-xl mb-5">{t(i18n.heading)}</h1>
          <div className="flex flex-col surface bg-">
            <AppLabel className="mb-2">{t(i18n.form.labels.email)}:</AppLabel>
            <AppTextInput
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <AppInputError error={errorMessage('email')} />
            <AppLabel className="mb-2">{t(i18n.form.labels.password)}:</AppLabel>
            <AppTextInput
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <AppInputError error={errorMessage('password')} />
          </div>
          <div className="flex flex-row gap-10 justify-center">
            <AppLink to="/auth/register" className="text-accent">
              {t(i18n.form.buttons.forgotPassword)}
            </AppLink>
          </div>
          <div className="mt-10 flex items-center justify-center">
            <div className="relative">
              <AppButton className="w-30 inline-block" onClick={loginButtonPress}>
                {t(i18n.form.buttons.signIn)}
              </AppButton>
              <div className="inline-block absolute pl-5">
                {loggingIn && <AppSpinner/>}
              </div>
            </div>
          </div>
          <div className="grow mt-10 flex justify-center">
            <span>{t(i18n.registerCta)}</span>
            <AppLink to="/auth/register" className="text-accent ml-3">
              {t(i18n.form.buttons.register)}
            </AppLink>
          </div>
          </AppBlock>
        </div>
    </PageContainer>
  );
};
