import {FC, useState} from 'react';
import {AppBlock} from '../../../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppButton} from '../../../../../../../common/components/atoms/AppButton/AppButton';
import {BasicPage} from '../../../../../../../common/components/layout/BasicPage/BasicPage';
import {PageContainer} from '../../../../../../../common/components/layout/PageContainer/PageContainer';
import {User, ChangePasswordRequest} from '../../../../../../../common/utils/openapi-client';
import {useAppPartialTranslation} from '../../../../../../utils/i18n/useAppPartialTranslation';
import {UserProfileBlock} from '../../../../../layout/UserProfileBlock/UserProfileBlock';
import {AppInputError} from '../../../../../../../common/components/atoms/AppInputError/AppInputError';
import {AppSection} from '../../../../../../../common/components/atoms/AppSection/AppSection';
import {SectionContent} from '../../../../../../../common/components/atoms/AppSection/components/SectionContent';
import {SectionHeader} from '../../../../../../../common/components/atoms/AppSection/components/SectionHeader';
import {AppTextInput} from '../../../../../../../common/components/atoms/AppTextInput/AppTextInput';
import {InputLabel} from '../../../../../../../common/components/atoms/InputLabel/InputLabel';
import {InputRow} from '../../../../../../../common/components/atoms/InputRow/InputRow';
import {route, RouteId} from '../../../../../../../common/utils/route';
import {BreadCrumbs} from '../../../../../blocks/BreadCrumbsBlock/types/BreadCrumbs';
import {BreadCrumbsBlock} from '../../../../../blocks/BreadCrumbsBlock/BreadCrumbsBlock';
import {AppSeparator} from '../../../../../../../common/components/atoms/AppSeparator/AppSeparator';
import {RouteLink} from '../../../../../../../common/components/atoms/RouteLink/RouteLink';
import {ErrorSlice, useResponseErrors} from '../../../../../../../common/utils/useResponseErrors';

interface PasswordChangePagePresenterProps {
 user: User;
 onSave: (data: ChangePasswordRequest) => Promise<void>;
 errors?: ErrorSlice<ChangePasswordRequest>;
}

export const PasswordChangePagePresenter: FC<PasswordChangePagePresenterProps> = (props) => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.settings.changePassword);
  const {getSmartError} = useResponseErrors<ChangePasswordRequest>(props.errors);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const user = props.user;
  const breadCrumbs: BreadCrumbs = [
    {label: translations.pages.settings.view.heading, url: route(RouteId.Settings)},
    {label: t(i18n.heading), url: route(RouteId.PasswordChange)},
  ];

  const onSaveClick = async () => {
    await props.onSave({oldPassword, newPassword, confirmation});
  };

  return (
    <PageContainer>
    <BasicPage>
      <BreadCrumbsBlock breadCrumbs={breadCrumbs} />
      <div className="flex md:flex-row gap-5">
        <UserProfileBlock user={user} own={true} />
        <div className="grow w-full">
          <AppBlock>
            <AppSection>
              <SectionHeader>{t(i18n.heading)}</SectionHeader>
              <SectionContent>
                <InputRow>
                  <InputLabel>{t(i18n.labels.oldPassword)}</InputLabel>
                  <div>
                    <AppTextInput password value={oldPassword} onChange={(x) => setOldPassword(x.target.value)}/>
                    <AppInputError error={getSmartError((x) => x.oldPassword)} />
                  </div>
                </InputRow>
                <InputRow>
                  <InputLabel>{t(i18n.labels.newPassword)}</InputLabel>
                  <div>
                    <AppTextInput password value={newPassword} onChange={(x) => setNewPassword(x.target.value)}/>
                    <AppInputError error={getSmartError((x) => x.newPassword)} />
                  </div>
                </InputRow>
                <InputRow>
                  <InputLabel>{t(i18n.labels.confirmPassword)}</InputLabel>
                  <div>
                    <AppTextInput password value={confirmation} onChange={(x) => setConfirmation(x.target.value)}/>
                    <AppInputError error={getSmartError((x) => x.confirmation)} />
                  </div>
                </InputRow>
              </SectionContent>
            </AppSection>
            <AppSeparator />
            <div className="mt-5 flex flex-row">
              <div className="grow">
                <RouteLink to={route(RouteId.Settings)}>{translations.utils.generic.buttons.back}</RouteLink>
              </div>
              <div className=" flex flex-row gap-5">
                <AppButton onClick={onSaveClick}>{translations.utils.generic.buttons.save}</AppButton>
              </div>
            </div>
          </AppBlock>
        </div>
      </div>
    </BasicPage>
  </PageContainer>
  );
};
