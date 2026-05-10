import {FC, useState} from 'react';
import {AppButton} from '../../../../../../common/components/atoms/AppButton/AppButton';
import {AppLabel} from '../../../../../../common/components/atoms/AppLabel/AppLabel';
import {PageContainer} from '../../../../../../common/components/layout/PageContainer/PageContainer';
import {RouteLink} from '../../../../../../common/components/atoms/RouteLink/RouteLink';
import {AppInputError} from '../../../../../../common/components/atoms/AppInputError/AppInputError';
import {AppBlock} from '../../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {AppTextInput} from '../../../../../../common/components/atoms/AppTextInput/AppTextInput';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';
import {route, RouteId} from '../../../../../../common/utils/route';
import {FinishPasswordResetData} from '../../../../../../common/utils/openapi-client';
import {ErrorSlice, useResponseErrors} from '../../../../../../common/utils/useResponseErrors';

interface PaswordResetCompletePagePresenterProps {
  onReset: (data: {password: string, passwordConfirmation: string}) => Promise<void>;
  errors?: ErrorSlice<FinishPasswordResetData['body']>;
}
export const PaswordResetCompletePagePresenter: FC<PaswordResetCompletePagePresenterProps> = (props) => {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.auth.passwordResetComplete);
  const {getSmartError} = useResponseErrors<FinishPasswordResetData['body']>(props.errors);
  const onResetClick = async () => {
    setIsLoading(true);
    await props.onReset({password, passwordConfirmation});
    setIsLoading(false);
  };
  return (
    <PageContainer className="justify-center bg-main text-main">
      <AppBlock className="p-10 w-full max-w-xl rounded-sm">
        <AppBlockHeader>{t(i18n.heading)}</AppBlockHeader>
        <AppLabel className="mb-5">{t(i18n.form.description)}</AppLabel>
        <div className="space-y-4">
          <div>
            <AppLabel className="mb-2">{t(i18n.form.labels.password)}</AppLabel>
            <AppTextInput
              password
              value={password}
              onChange={(x) => setPassword(x.target.value)}
              placeholder={t(i18n.form.placeholders.password)}
            />
            <AppInputError error={getSmartError((x) => x?.password)} />
          </div>
          <div>
            <AppLabel className="mb-2">{t(i18n.form.labels.passwordConfirmation)}</AppLabel>
            <AppTextInput
              password
              value={passwordConfirmation}
              onChange={(x) => setPasswordConfirmation(x.target.value)}
              placeholder={t(i18n.form.placeholders.passwordConfirmation)}
            />
            <AppInputError error={getSmartError((x) => x?.passwordConfirmation)} />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-5 mt-5">
          <RouteLink to={route(RouteId.Login)}>{t(i18n.form.buttons.signIn)}</RouteLink>
          <div className="grow flex flex-row-reverse">
            <AppButton
              onClick={onResetClick}
              disabled={isLoading || !password || !passwordConfirmation}
            >
              {t(i18n.form.buttons.reset)}
            </AppButton>
          </div>
        </div>
      </AppBlock>
    </PageContainer>
  );
};
