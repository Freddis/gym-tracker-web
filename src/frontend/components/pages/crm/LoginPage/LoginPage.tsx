import {FC, useContext, useState} from 'react';
import {AppBlock} from '../../../atoms/AppBlock/AppBlock';
import {AppButton} from '../../../atoms/AppButton/AppButton';
import {AppInputError} from '../../../atoms/AppInputError/AppInputError';
import {AppLabel} from '../../../atoms/AppLabel/AppLabel';
import {AppSpinner} from '../../../atoms/AppSpinner/AppSpinner';
import {AppTextInput} from '../../../atoms/AppTextInput/AppTextInput';
import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {useResponseErrors} from '../../../../utils/useResponseErrors';
import {useToasts} from '../../../atoms/AppToast/hooks/useToasts';
import {AppLogo} from '../../../atoms/AppLogo/AppLogo';
import {postCrmAuthLogin, PostCrmAuthLoginError} from '../../../../utils/openapi-client';
import {useNavigate} from '@tanstack/react-router';
import {AuthContext} from '../../../layout/AuthProvider/AuthContext';


export const LoginPage: FC = () => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.auth.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrors] = useResponseErrors();
  const toasts = useToasts();
  if (auth.user) {
    navigate({
      to: '/crm/users',
    });
  }
  const loginButtonPress = async () => {
    setLoggingIn(true);
    setTimeout(login, 0);
  };
  const login = async () => {
    const result = await postCrmAuthLogin({
      body: {
        email,
        password,
      },
    });
    setLoggingIn(false);
    if (!result.error) {
      auth.login(result.data);
      toasts.addSuccess('You successfully logged in');
      navigate({to: '/crm/users'});
      return;
    }
    const err: PostCrmAuthLoginError = result.error;
    if (err.error.code === 'ValidationFailed') {
      setErrors(err.error.fieldErrors ?? []);
    } else if (err.error.code === 'ActionError') {
      toasts.addDanger(err.error.humanReadable);
    } else {
      toasts.addDanger(t(i18n.toasts.unknownApiError));
    }
  };
  return (
     <PageContainer className="justify-center bg-main text-main">
            <AppBlock className="p-10 w-full max-w-xl rounded-sm">
              <div className="flex justify-center mb-10">
              <AppLogo></AppLogo>
              </div>
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
              </AppBlock>
        </PageContainer>
  );

};
