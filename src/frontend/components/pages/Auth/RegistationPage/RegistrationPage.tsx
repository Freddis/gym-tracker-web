import {useNavigate} from '@tanstack/react-router';
import {FC, useState} from 'react';
import {useAppPartialTranslation} from '../../../../i18n/useAppPartialTranslation';
import {AppButton} from '../../../atoms/AppButton/AppButton';
import {AppLabel} from '../../../atoms/AppLabel/AppLabel';
import {AppTextInput} from '../../../atoms/AppTextInput/AppTextInput';
import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {AppLink} from '../../../atoms/AppLink/AppLink';


export const RegistrationPage: FC = () => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.auth.registration);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

  const register = () => {
    navigate({to: '/'});
  };

  return (
    <PageContainer className="justify-center bg-neutral">
      <div className="bg-neutral-surface text-on-neutral-surface p-10 min-w-xl rounded-sm">
        <h1 className="text-center text-xl">{t(i18n.heading)}</h1>
        <div className="flex flex-col gap-3">
          <AppLabel>{t(i18n.form.labels.name)}</AppLabel>
          <AppTextInput onChange={(e) => setName(e.target.value)} value={name}/>
          <AppLabel>{t(i18n.form.labels.email)}</AppLabel>
          <AppTextInput onChange={(e) => setEmail(e.target.value)} value={email}/>
          <AppLabel>{t(i18n.form.labels.password)}</AppLabel>
          <AppTextInput type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
          <AppLabel>{t(i18n.form.labels.passwordConfirmation)}</AppLabel>
          <AppTextInput type="password" onChange={(e) => setPasswordConfirmation(e.target.value)} value={passwordConfirmation} />
          <div className="flex flex-row mt-5">
            <AppLink to="/auth/login" style={{marginLeft: 20}}>{t(i18n.form.buttons.signIn)}</AppLink>
            <div className="grow flex flex-row-reverse">
              <AppButton onClick={register}>{t(i18n.form.buttons.register)}</AppButton>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
