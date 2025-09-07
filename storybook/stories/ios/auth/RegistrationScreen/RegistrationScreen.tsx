import {FC, useContext, useState} from 'react';
import {AppLogo} from '../../../../../src/frontend/components/atoms/AppLogo/AppLogo';
import {IphoneDisplay} from '../../../../components/IphoneDisplay/IphoneDisplay';
import {MobileScreenContainer} from '../../../../components/MobileScreenContainer/MobileScreenContainer';
import {AppButton} from '../../../../../src/frontend/components/atoms/AppButton/AppButton';
import {AppInputError} from '../../../../../src/frontend/components/atoms/AppInputError/AppInputError';
import {AppLabel} from '../../../../../src/frontend/components/atoms/AppLabel/AppLabel';
import {AppTextInput} from '../../../../../src/frontend/components/atoms/AppTextInput/AppTextInput';
import {useAppPartialTranslation} from '../../../../../src/frontend/utils/i18n/useAppPartialTranslation';
import {useNavigate} from '@tanstack/react-router';
import {useToasts} from '../../../../../src/frontend/components/atoms/AppToast/hooks/useToasts';
import {AuthContext} from '../../../../../src/frontend/components/layout/AuthProvider/AuthContext';
import {postAuthRegister, PostAuthRegisterError} from '../../../../../src/frontend/utils/openapi-client';
import {useResponseErrors} from '../../../../../src/frontend/utils/useResponseErrors';

export const RegistrationScreen: FC = () => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.auth.registration);
  const toasts = useToasts();
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
      toasts.addSuccess(t(i18n.toasts.registrationSuccess));
      navigate({to: '/entries'});
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
  <IphoneDisplay tab={3} title="Sign Up" hideTabs>
   <MobileScreenContainer className="flex flex-col h-full">
      <div className="flex flex-col items-center justify-center grow">
        <div className="flex flex-col items-center w-full p-10 text-left">
          <AppLogo withText={true} className="mb-10"/>
          {/* <h2 className="inline uppercase font-bold text-2xl ml-1 text-on-main mb-10">Discipline</h2> */}
          <div className="flex flex-col items-start w-full">
            <AppLabel>{t(i18n.form.labels.name)}</AppLabel>
            <AppTextInput data-testid="name" onChange={(e) => setName(e.target.value)} value={name}/>
            <AppInputError error={errorMessage('name')} />
            <AppLabel >{t(i18n.form.labels.email)}:</AppLabel>
            <AppTextInput
              data-testid="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <AppInputError error={errorMessage('email')} />
            <AppLabel>{t(i18n.form.labels.password)}:</AppLabel>
            <AppTextInput
              data-testid="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <AppInputError error={errorMessage('password')} />
            <AppLabel className="mb-2">{t(i18n.form.labels.passwordConfirmation)}</AppLabel>
            <AppTextInput
            data-testid="passwordConfirmation"
            type="password"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            value={passwordConfirmation}
            />
            <AppInputError error={errorMessage('passwordConfirmation')} />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-5 mt-5 ">
            <div className="grow flex flex-row-reverse">
              <AppButton onClick={register}>{t(i18n.form.buttons.register)}</AppButton>
            </div>
          </div>
        </div>
      </div>
    </MobileScreenContainer>
  </IphoneDisplay>
  );
};
