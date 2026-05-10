import {useNavigate} from '@tanstack/react-router';
import {FC, useContext, useState} from 'react';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {AppButton} from '../../../../../common/components/atoms/AppButton/AppButton';
import {AppInputError} from '../../../../../common/components/atoms/AppInputError/AppInputError';
import {AppLabel} from '../../../../../common/components/atoms/AppLabel/AppLabel';
import {RouteLink} from '../../../../../common/components/atoms/RouteLink/RouteLink';
import {AppTextInput} from '../../../../../common/components/atoms/AppTextInput/AppTextInput';
import {AuthContext} from '../../../../../common/components/layout/AuthProvider/AuthContext';
import {PageContainer} from '../../../../../common/components/layout/PageContainer/PageContainer';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {AppBlockHeader} from '../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {route, RouteId} from '../../../../../common/utils/route';
import {api} from '../../../../../common/utils/api';

export const LoginPage: FC = () => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.auth.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const {getError, showToastsAndSetErrors} = useResponseErrors();
  const toasts = useToasts();
  const loginButtonPress = async () => {
    const result = await api.login({
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
    navigate({to: route(RouteId.EntryList)});
    return;
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
              password
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <AppInputError data-testid="error-password" error={getError('password')} />
          </div>
          <div className="flex flex-row gap-10 justify-center">
            <RouteLink to={route(RouteId.PasswordResetStart)} className="text-accent">
              {t(i18n.form.buttons.forgotPassword)}
            </RouteLink>
          </div>
          <div className="mt-10 flex items-center justify-center">
              <AppButton className="w-30 inline-block" onClick={loginButtonPress}>
                {t(i18n.form.buttons.signIn)}
              </AppButton>
          </div>
          <div className="grow mt-10 flex justify-center">
            <span>{t(i18n.registerCta)}</span>
            <RouteLink to={route(RouteId.Register)} className="text-accent ml-3">
              {t(i18n.form.buttons.register)}
            </RouteLink>
          </div>
          </AppBlock>
    </PageContainer>
  );
};
