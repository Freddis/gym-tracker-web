import {FC} from 'react';
import {AppApiErrorDisplay} from '../../../../../../../common/components/atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {AppBlock} from '../../../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppButton} from '../../../../../../../common/components/atoms/AppButton/AppButton';
import {AppLabel} from '../../../../../../../common/components/atoms/AppLabel/AppLabel';
import {AppPageHeading} from '../../../../../../../common/components/atoms/AppPageHeading/AppPageHeading';
import {AppSpinner} from '../../../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {BasicPage} from '../../../../../../../common/components/layout/BasicPage/BasicPage';
import {PageContainer} from '../../../../../../../common/components/layout/PageContainer/PageContainer';
import {ApiResponse} from '../../../../../../../common/types/ApiResponse';
import {User, GetSettingsResponse, GetSettingsError} from '../../../../../../../common/utils/openapi-client';
import {useAppPartialTranslation} from '../../../../../../utils/i18n/useAppPartialTranslation';
import {UserProfileBlock} from '../../../../../layout/UserProfileBlock/UserProfileBlock';
import {RouteLink} from '../../../../../../../common/components/atoms/RouteLink/RouteLink';
import {route, RouteId} from '../../../../../../../common/utils/route';

interface SettingsPagePresenterProps {
 response: ApiResponse<GetSettingsResponse, GetSettingsError>;
 user: User;
}

export const SettingsPagePresenter: FC<SettingsPagePresenterProps> = (props) => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.settings.view);
  const user = props.user;
  const settings = props.response.data?.data;
  return (
    <PageContainer>
    <BasicPage>
      <div className="w-full text-left mb-5 flex">
        <AppPageHeading>{t(i18n.heading)}</AppPageHeading>
      </div>
      <div className="flex flex-col md:flex-row gap-5 items-start">
        <UserProfileBlock user={user} own={true} />
        <div className="flex flex-col gap-5 grow w-full" data-testid="main-content">
          {props.response.isLoading && (
            <AppSpinner />
          )}
          {(props.response.isError || props.response.data?.error?.error) && (
            <AppApiErrorDisplay error={props.response.data?.error?.error} />
          )}
          {settings && (
          <>
            <AppBlock>
              <div className="flex flex-col gap-5">
                <div className="flex">
                  <div className="text-lg grow font-semibold">{t(i18n.labels.general)}</div>
                  <RouteLink to={route(RouteId.SettingsUpdate)}>
                    <AppButton>{t(i18n.buttons.edit)}</AppButton>
                  </RouteLink>
                </div>
                <div className="flex flex-col gap-2 items-start">
                  <div className="">
                    <p>{settings.note}</p>
                  </div>
                </div>
                <div className="w-full grid grid-cols-3 gap-">
                  <div>
                    <AppLabel>{t(i18n.labels.height)}</AppLabel>
                    <div>{settings.height} {translations.utils.objects.heightUnits[settings.units.height]}</div>
                  </div>
                  <div>
                    <AppLabel>{t(i18n.labels.weight)}</AppLabel>
                    {settings.weight && <div>{settings.weight} {translations.utils.objects.weightUnits[settings.units.weight]}</div>}
                    {!settings.weight && '-'}
                  </div>
                  <div>
                    <AppLabel>{t(i18n.labels.age)}</AppLabel>
                    <div>{new Date().getFullYear() - settings.birthDate.getFullYear()}</div>
                  </div>
                </div>
              </div>
            </AppBlock>
            <AppBlock>
              <div className="text-lg font-semibold">{t(i18n.labels.units)}</div>
              <div className="flex flex-col gap-5">
                <div className="w-full grid grid-cols-4 ">
                  <div>
                    <AppLabel>{t(i18n.labels.height)}</AppLabel>
                    <div>{translations.utils.objects.heightUnits[settings.units.height]}</div>
                  </div>
                  <div>
                    <AppLabel>{t(i18n.labels.weight)}</AppLabel>
                    <div>{translations.utils.objects.weightUnits[settings.units.weight]}</div>
                  </div>
                  <div>
                    <AppLabel>{t(i18n.labels.distance)}</AppLabel>
                    <div>{translations.utils.objects.distanceUnits[settings.units.distance]}</div>
                  </div>
                  <div>
                    <AppLabel>{t(i18n.labels.temperature)}</AppLabel>
                    <div>{translations.utils.objects.temperatureUnits[settings.units.temperature]}</div>
                  </div>
                </div>
                <div>
                  <AppLabel>{t(i18n.labels.country)}</AppLabel>
                  <div>{translations.utils.objects.countries[settings.country]}</div>
                </div>
              </div>
            </AppBlock>
            <AppBlock>
              <div className="flex flex-col gap-5">
                <div className="flex">
                  <div className="text-lg grow font-semibold">{t(i18n.labels.security)}</div>
                  {/* <AppButton color="accent">Edit</AppButton> */}
                </div>
                <div className="flex items-end">
                  <div className="flex flex-col gap-2 items-start grow">
                    <AppLabel>{t(i18n.labels.email)}</AppLabel>
                    <div className="font">{settings.security.email}</div>
                  </div>
                  <div className="flex flex-col gap-2 items-start grow">
                    <AppLabel>{t(i18n.labels.visibility)}</AppLabel>
                    <div className="font">{translations.utils.objects.entryVisibility[settings.security.visibility]}</div>
                  </div>
                  <div>
                    <RouteLink to={route(RouteId.PasswordChange)}>
                      <AppButton>{t(i18n.buttons.changePassword)}</AppButton>
                    </RouteLink>
                  </div>
                </div>
              </div>
            </AppBlock>
          </>
          )}
        </div>
    </div>
    </BasicPage>
  </PageContainer>
  );
};
