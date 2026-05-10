import {FC, MouseEventHandler, useState} from 'react';
import {AppLogo} from '../../../../../src/frontend/common/components/atoms/AppLogo/AppLogo';
import {IphoneDisplay} from '../../../../components/IphoneDisplay/IphoneDisplay';
import {MobileScreenContainer} from '../../../../components/MobileScreenContainer/MobileScreenContainer';
import {AppButton} from '../../../../../src/frontend/common/components/atoms/AppButton/AppButton';
import {AppInputError} from '../../../../../src/frontend/common/components/atoms/AppInputError/AppInputError';
import {AppLabel} from '../../../../../src/frontend/common/components/atoms/AppLabel/AppLabel';
import {AppTextInput} from '../../../../../src/frontend/common/components/atoms/AppTextInput/AppTextInput';
import {useAppPartialTranslation} from '../../../../../src/frontend/website/utils/i18n/useAppPartialTranslation';
import {FieldError, useResponseErrors} from '../../../../../src/frontend/common/utils/useResponseErrors';
import {AppLink} from '../../../../../src/frontend/common/components/atoms/AppLink/AppLink';


export const LoginScreen: FC<{errors?: FieldError[]}> = ({errors}) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.auth.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {getError} = useResponseErrors(errors);

  const loginButtonPress = async () => {

  };

  const forgotPasswordClick: MouseEventHandler<HTMLAnchorElement> = async () => {
  };

  return (
  <IphoneDisplay tab={3} hideTabs>
   <MobileScreenContainer className="flex flex-col h-full">
    <div className="flex flex-col items-center justify-center grow">
      <div className="flex flex-col items-center w-full p-10">
        <AppLogo withText={false} className="h-20 mb-3"/>
        <h2 className="inline uppercase font-bold text-2xl ml-1 text-on-main mb-10">Discipline</h2>
          <div className="flex flex-col w-full">
            <AppLabel>Email:</AppLabel>
            <AppTextInput
              data-testid="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <AppInputError data-testid="error-email" error={getError('email')} />
            <AppLabel>{t(i18n.form.labels.password)}:</AppLabel>
            <AppTextInput
              data-testid="password"
              password
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <AppInputError data-testid="error-password" error={getError('password')} />
          </div>
          <div className="flex flex-row justify-center">
            <AppLink onClick={forgotPasswordClick} className="text-accent">
              {t(i18n.form.buttons.forgotPassword)}
            </AppLink>
          </div>
          <div className="mt-10 flex items-center justify-center">
            <div className="relative">
              <AppButton className="w-30 inline-block" onClick={loginButtonPress}>
                {t(i18n.form.buttons.signIn)}
              </AppButton>
            </div>
          </div>
          <div className="grow mt-20 flex justify-center">
            <span>{t(i18n.registerCta)}</span>
            <AppLink className="text-accent ml-3">
              {t(i18n.form.buttons.register)}
            </AppLink>
          </div>
        </div>
      </div>
    </MobileScreenContainer>
  </IphoneDisplay>
  );
};
