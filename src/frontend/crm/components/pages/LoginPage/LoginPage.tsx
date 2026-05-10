import {FC, useContext, useState} from 'react';
import {AppBlock} from '../../../../common/components/atoms/AppBlock/AppBlock';
import {AppButton} from '../../../../common/components/atoms/AppButton/AppButton';
import {AppInputError} from '../../../../common/components/atoms/AppInputError/AppInputError';
import {AppLabel} from '../../../../common/components/atoms/AppLabel/AppLabel';
import {AppSpinner} from '../../../../common/components/atoms/AppSpinner/AppSpinner';
import {AppTextInput} from '../../../../common/components/atoms/AppTextInput/AppTextInput';
import {useAppPartialTranslation} from '../../../../website/utils/i18n/useAppPartialTranslation';
import {useResponseErrors} from '../../../../common/utils/useResponseErrors';
import {useToasts} from '../../../../common/components/atoms/AppToast/hooks/useToasts';
import {AppLogo} from '../../../../common/components/atoms/AppLogo/AppLogo';
import {api} from '../../../../common/utils/api';
import {useNavigate} from '@tanstack/react-router';
import {AuthContext} from '../../../../common/components/layout/AuthProvider/AuthContext';
import {PageContainer} from '../../../../common/components/layout/PageContainer/PageContainer';

export const LoginPage: FC = () => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.auth.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const {getError, showToastsAndSetErrors} = useResponseErrors();
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
    const result = await api.managerLogin({
      body: {
        email,
        password,
      },
    });
    setLoggingIn(false);
    if (showToastsAndSetErrors(result, {noValidationToasts: true})) {
      return;
    }
    auth.login(result.data);
    toasts.addSuccess(t(i18n.toasts.loginSuccess));
    navigate({to: '/crm/users'});
    return;
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
          <AppInputError error={getError('email')} />
          <AppLabel className="mb-2">{t(i18n.form.labels.password)}:</AppLabel>
          <AppTextInput
            password
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <AppInputError error={getError('password')} />
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
