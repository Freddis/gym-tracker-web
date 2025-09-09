import {FC, useState} from 'react';
import {AppLogo} from '../../../../../src/frontend/components/atoms/AppLogo/AppLogo';
import {IphoneDisplay} from '../../../../components/IphoneDisplay/IphoneDisplay';
import {MobileScreenContainer} from '../../../../components/MobileScreenContainer/MobileScreenContainer';
import {AppButton} from '../../../../../src/frontend/components/atoms/AppButton/AppButton';
import {AppInputError} from '../../../../../src/frontend/components/atoms/AppInputError/AppInputError';
import {AppLabel} from '../../../../../src/frontend/components/atoms/AppLabel/AppLabel';
import {AppTextInput} from '../../../../../src/frontend/components/atoms/AppTextInput/AppTextInput';
import {useAppPartialTranslation} from '../../../../../src/frontend/utils/i18n/useAppPartialTranslation';
import {FieldError, useResponseErrors} from '../../../../../src/frontend/utils/useResponseErrors';

export const RegistrationScreen: FC<{errors?: FieldError[]}> = ({errors}) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.auth.registration);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const {getError} = useResponseErrors(errors);

  const register = async () => {

  };

  return (
  <IphoneDisplay tab={3} title="Sign Up" hideTabs>
   <MobileScreenContainer className="flex flex-col h-full">
      <div className="flex flex-col items-center justify-center grow">
        <div className="flex flex-col items-center w-full p-10 text-left">
          <AppLogo withText={true} className="mb-10"/>
          <div className="flex flex-col items-start w-full">
            <AppLabel>{t(i18n.form.labels.name)}</AppLabel>
            <AppTextInput data-testid="name" onChange={(e) => setName(e.target.value)} value={name}/>
            <AppInputError error={getError('name')} />
            <AppLabel >{t(i18n.form.labels.email)}:</AppLabel>
            <AppTextInput
              data-testid="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <AppInputError error={getError('email')} />
            <AppLabel>{t(i18n.form.labels.password)}:</AppLabel>
            <AppTextInput
              data-testid="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <AppInputError error={getError('password')} />
            <AppLabel>{t(i18n.form.labels.passwordConfirmation)}</AppLabel>
            <AppTextInput
            data-testid="passwordConfirmation"
            type="password"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            value={passwordConfirmation}
            />
            <AppInputError error={getError('passwordConfirmation')} />
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
