import {useNavigate} from '@tanstack/react-router';
import {FC, useState} from 'react';
import {AppButton} from '../../../../../common/components/atoms/AppButton/AppButton';
import {AppLabel} from '../../../../../common/components/atoms/AppLabel/AppLabel';
import {AppTextInput} from '../../../../../common/components/atoms/AppTextInput/AppTextInput';
import {PageContainer} from '../../../../../common/components/layout/PageContainer/PageContainer';
import {RouteLink} from '../../../../../common/components/atoms/RouteLink/RouteLink';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {AppInputError} from '../../../../../common/components/atoms/AppInputError/AppInputError';
import {api} from '../../../../../common/utils/api';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {route, RouteId} from '../../../../../common/utils/route';

export const PasswordResetPage: FC = () => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.auth.passwordReset);
  const toasts = useToasts();
  const [email, setEmail] = useState('');
  const {getError, showToastsAndSetErrors} = useResponseErrors();
  const navigate = useNavigate();

  const onResetClick = async () => {
    const result = await api.startPasswordReset({
      body: {
        email,
      },
    });
    if (showToastsAndSetErrors(result, {noValidationToasts: true})) {
      return;
    }
    toasts.addSuccess(t(i18n.toasts.resetSuccess));
    navigate({to: route(RouteId.Login)});
    return;
  };

  return (
    <PageContainer className="justify-center bg-main text-main">
      <AppBlock className="p-10 w-full max-w-xl rounded-sm">
        <AppBlockHeader >{t(i18n.heading)}</AppBlockHeader>
        <AppLabel className="mb-5">{t(i18n.form.description)}:</AppLabel>
        <AppTextInput
          data-testid="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <AppInputError error={getError('email')} />
        <div className="flex flex-col sm:flex-row items-center gap-5 mt-5 ">
          <RouteLink to={route(RouteId.Login)}>{t(i18n.form.buttons.signIn)}</RouteLink>
          <div className="grow flex flex-row-reverse">
            <AppButton onClick={onResetClick}>{t(i18n.form.buttons.reset)}</AppButton>
          </div>
        </div>
      </AppBlock>
    </PageContainer>
  );
};
