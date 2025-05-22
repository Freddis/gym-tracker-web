import {Link, useNavigate} from '@tanstack/react-router';
import {FC, useState} from 'react';
import {AppButton} from 'src/frontend/components/atoms/AppButton/AppButton';
import {AppLabel} from 'src/frontend/components/atoms/AppLabel/AppLabel';
import {AppTextInput} from 'src/frontend/components/atoms/AppTextInput/AppTextInput';
import {PageContainer} from 'src/frontend/components/layout/PageContainer/PageContainer';
import {useAppPartialTranslation} from 'src/frontend/i18n/useAppPartialTranslation';

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
          <div>
            <AppButton onClick={register}>Register</AppButton>
            <Link to="/auth/login" style={{marginLeft: 20}}>Sign in</Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
