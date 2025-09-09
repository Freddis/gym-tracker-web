import {useNavigate} from '@tanstack/react-router';
import {FC, MouseEventHandler, useContext, useState} from 'react';
import {useResponseErrors} from '../../../../utils/useResponseErrors';
import {AppButton} from '../../../atoms/AppButton/AppButton';
import {AppInputError} from '../../../atoms/AppInputError/AppInputError';
import {AppLabel} from '../../../atoms/AppLabel/AppLabel';
import {AppLink} from '../../../atoms/AppLink/AppLink';
import {AppTextInput} from '../../../atoms/AppTextInput/AppTextInput';
import {AuthContext} from '../../../layout/AuthProvider/AuthContext';
import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {AppBlock} from '../../../atoms/AppBlock/AppBlock';
import {postAuthLogin} from '../../../../utils/openapi-client';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {useToasts} from '../../../atoms/AppToast/hooks/useToasts';
import {AppBlockHeader} from '../../../atoms/AppBlock/components/AppBlockHeader';

export const LoginPage: FC = () => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.auth.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const {getError, showToastsAndSetErrors} = useResponseErrors();
  const toasts = useToasts();

  const loginButtonPress = async () => {
    const result = await postAuthLogin({
      body: {
        email,
        password,
      },
    });
    if (showToastsAndSetErrors(result, {noValidationToasts: true})) {
      return;
    }
    auth.login(result.data);
    toasts.addSuccess(t(i18n.toasts.loginSuccess));
    navigate({to: '/entries'});
    return;
  };

  const forgotPasswordClick: MouseEventHandler<HTMLAnchorElement> = async (e) => {
    e.preventDefault();
    toasts.addWarning(t(i18n.toasts.notImplemented));
  };

  return (
    <PageContainer className="justify-center bg-main text-main">
        <AppBlock className="p-10 w-full max-w-xl rounded-sm">
          <AppBlockHeader className="text-center text-xl mb-5">{t(i18n.heading)}</AppBlockHeader>
          <div className="flex flex-col">
            <AppLabel className="mb-2">{t(i18n.form.labels.email)}:</AppLabel>
            <AppTextInput
              data-testid="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <AppInputError data-testid="error-email" error={getError('email')} />
            <AppLabel className="mb-2">{t(i18n.form.labels.password)}:</AppLabel>
            <AppTextInput
              data-testid="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <AppInputError data-testid="error-password" error={getError('password')} />
          </div>
          <div className="flex flex-row gap-10 justify-center">
            <AppLink to="/auth/register" onClick={forgotPasswordClick} className="text-accent">
              {t(i18n.form.buttons.forgotPassword)}
            </AppLink>
          </div>
          <div className="mt-10 flex items-center justify-center">
              <AppButton className="w-30 inline-block" onClick={loginButtonPress}>
                {t(i18n.form.buttons.signIn)}
              </AppButton>
          </div>
          <div className="grow mt-10 flex justify-center">
            <span>{t(i18n.registerCta)}</span>
            <AppLink to="/auth/register" className="text-accent ml-3">
              {t(i18n.form.buttons.register)}
            </AppLink>
          </div>
          </AppBlock>
    </PageContainer>
  );
};
