import {useNavigate} from '@tanstack/react-router';
import {FC, useContext, useState} from 'react';
import {AppButton} from '../../../../../common/components/atoms/AppButton/AppButton';
import {AppLabel} from '../../../../../common/components/atoms/AppLabel/AppLabel';
import {AppTextInput} from '../../../../../common/components/atoms/AppTextInput/AppTextInput';
import {PageContainer} from '../../../../../common/components/layout/PageContainer/PageContainer';
import {RouteLink} from '../../../../../common/components/atoms/RouteLink/RouteLink';
import {AuthContext} from '../../../../../common/components/layout/AuthProvider/AuthContext';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {AppInputError} from '../../../../../common/components/atoms/AppInputError/AppInputError';
import {postAuthRegister} from '../../../../../common/utils/openapi-client';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {route, RouteId} from '../../../../../common/utils/route';

export const RegistrationPage: FC = () => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.auth.registration);
  const toasts = useToasts();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const {getError, showToastsAndSetErrors} = useResponseErrors();
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
    if (showToastsAndSetErrors(result, {noValidationToasts: true})) {
      return;
    }
    auth.login(result.data);
    toasts.addSuccess(t(i18n.toasts.registrationSuccess));
    navigate({to: '/entries'});
    return;
  };

  return (
    <PageContainer className="justify-center bg-main text-main">
      <AppBlock className="p-10 w-full max-w-xl rounded-sm">
        <AppBlockHeader >{t(i18n.heading)}</AppBlockHeader>
        <AppLabel className="mb-2">{t(i18n.form.labels.name)}</AppLabel>
        <AppTextInput data-testid="name" onChange={(e) => setName(e.target.value)} value={name}/>
        <AppInputError error={getError('name')} />
        <AppLabel className="mb-2">{t(i18n.form.labels.email)}:</AppLabel>
        <AppTextInput
          data-testid="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <AppInputError error={getError('email')} />
        <AppLabel className="mb-2">{t(i18n.form.labels.password)}:</AppLabel>
        <AppTextInput
          data-testid="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <AppInputError error={getError('password')} />
        <AppLabel className="mb-2">{t(i18n.form.labels.passwordConfirmation)}</AppLabel>
        <AppTextInput
        data-testid="passwordConfirmation"
        type="password"
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        value={passwordConfirmation}
        />
        <AppInputError error={getError('passwordConfirmation')} />

        <div className="flex flex-col sm:flex-row items-center gap-5 mt-5 ">
          <RouteLink to={route(RouteId.Login)}>{t(i18n.form.buttons.signIn)}</RouteLink>
          <div className="grow flex flex-row-reverse">
            <AppButton onClick={register}>{t(i18n.form.buttons.register)}</AppButton>
          </div>
        </div>
      </AppBlock>
    </PageContainer>
  );
};
