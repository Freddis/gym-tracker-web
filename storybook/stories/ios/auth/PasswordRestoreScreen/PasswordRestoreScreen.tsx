import {FC, useState} from 'react';
import {AppLogo} from '../../../../../src/frontend/common/components/atoms/AppLogo/AppLogo';
import {IphoneDisplay} from '../../../../components/IphoneDisplay/IphoneDisplay';
import {MobileScreenContainer} from '../../../../components/MobileScreenContainer/MobileScreenContainer';
import {AppButton} from '../../../../../src/frontend/common/components/atoms/AppButton/AppButton';
import {AppInputError} from '../../../../../src/frontend/common/components/atoms/AppInputError/AppInputError';
import {AppTextInput} from '../../../../../src/frontend/common/components/atoms/AppTextInput/AppTextInput';
import {useAppPartialTranslation} from '../../../../../src/frontend/website/utils/i18n/useAppPartialTranslation';
import {FieldError, useResponseErrors} from '../../../../../src/frontend/common/utils/useResponseErrors';


export const PasswordRestoreScreen: FC<{errors?: FieldError[]}> = ({errors}) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.auth.passwordRestore);
  const [email, setEmail] = useState('');
  const {getError} = useResponseErrors(errors);
  const loginButtonPress = async () => {
  };

  return (
  <IphoneDisplay title="Restore Password" tab={3} hideTabs>
   <MobileScreenContainer className="flex flex-col h-full">
    <div className="flex flex-col items-center justify-center grow">
      <div className="flex flex-col items-center w-full p-10">
        <AppLogo withText={false} className="h-20 mb-3"/>
        <h2 className="inline uppercase font-bold text-2xl ml-1 text-on-main mb-10">Discipline</h2>
          <div className="flex flex-col w-full">
            <div className="mb-2">{t(i18n.form.description)}</div>
            <AppTextInput
              data-testid="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <AppInputError data-testid="error-email" error={getError('email')} />
          </div>

          <div className="mt-10 flex items-center justify-center">
            <div className="relative">
              <AppButton className="w-30 inline-block" onClick={loginButtonPress}>
                {t(i18n.form.buttons.restore)}
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </MobileScreenContainer>
  </IphoneDisplay>
  );
};
