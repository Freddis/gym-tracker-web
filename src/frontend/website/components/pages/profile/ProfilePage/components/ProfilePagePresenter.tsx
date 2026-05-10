import {FC} from 'react';
import {GetFoodError, User} from '../../../../../../common/utils/openapi-client';
import {PageContainer} from '../../../../../../common/components/layout/PageContainer/PageContainer';
import {BasicPage} from '../../../../../../common/components/layout/BasicPage/BasicPage';
import {AppBlock} from '../../../../../../common/components/atoms/AppBlock/AppBlock';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';
import {AppPageHeading} from '../../../../../../common/components/atoms/AppPageHeading/AppPageHeading';
import {ApiResponse} from '../../../../../../common/types/ApiResponse';
import {AppApiErrorDisplay} from '../../../../../../common/components/atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {AppSpinner} from '../../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {AppLabel} from '../../../../../../common/components/atoms/AppLabel/AppLabel';
import {FaAppleAlt, FaWeight} from 'react-icons/fa';
import {UserProfileBlock} from '../../../../layout/UserProfileBlock/UserProfileBlock';
import {AppButton} from '../../../../../../common/components/atoms/AppButton/AppButton';

export type GetUserResponse = User;
export type GetUserError = GetFoodError;

interface ProfilePagePresenterProps {
 response: ApiResponse<GetUserResponse, GetUserError>;
 own?: boolean;
}

export const ProfilePagePresenter: FC<ProfilePagePresenterProps> = (props) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.profile);
  if (!props.response.data?.data) {
    const error = props.response.data?.error?.error;
    return (
      <PageContainer>
        <AppApiErrorDisplay error={error} />
      </PageContainer>
    );
  }
  if (props.response.isLoading) {
    return (
      <PageContainer>
        <AppSpinner />
      </PageContainer>
    );
  }
  const user = props.response.data.data;
  return (
    <PageContainer>
    <BasicPage>
      <div className="w-full text-left mb-5 flex">
        <AppPageHeading>{t(i18n.heading)}</AppPageHeading>
        <div className="grow flex flex-row-reverse gap-5 items-center">
          {/* {props.own && (
            <RouteLink to={route(RouteId.EntryAdd)} className="z-0">
              <AppButton>{'Edit'}</AppButton>
            </RouteLink>
          )} */}
        </div>
      </div>
    <div className="flex flex-col md:flex-row gap-5 items-start">
      <UserProfileBlock user={user} own={props.own} />
      <div className="flex flex-col gap-5 grow w-full" data-testid="main-content">
        <AppBlock>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 items-start">
              <div className="flex w-full">
                <div className="text-lg grow font-semibold">{t(i18n.labels.about)}</div>
              </div>
              <div className="">
                <p>Training for my first half marathon and trying to stay consistent.</p>
              </div>
            </div>
            <div className="w-full grid grid-cols-3 gap-">
              <div>
                <AppLabel>{t(i18n.labels.height)}</AppLabel>
                <div>180 cm</div>
              </div>
              <div>
                <AppLabel>{t(i18n.labels.weight)}</AppLabel>
                <div>70 kg</div>
              </div>
              <div>
                <AppLabel>{t(i18n.labels.age)}</AppLabel>
                <div>25 years</div>
              </div>
            </div>
            {props.own && (
              <div className="flex flex-col gap-2 items-start w-full">
                <div className="text-lg bold">{t(i18n.labels.visibility)}</div>
                <div className="font-semibold">Public </div>
              </div>
            )}
          </div>
        </AppBlock>
        <div className="flex flex-col gap-2 items-start w-full">
          <div className="flex flex-row gap-2 w-full items-center">
            <div className="text-lg bold grow">{t(i18n.labels.goals)}</div>
            {props.own && <AppButton color="accent">Add Goal</AppButton>}
          </div>
          <div className="flex flex-col gap-5 w-full">
            <AppBlock>
              <div className="w-full flex flex-row gap-5 items-center">
                <FaAppleAlt className="w-10 h-10" />
                <div className="flex flex-col gap-2">
                  <div className="text-md text-bold">Daily Calorie Goal</div>
                  <div className="text-lg font-semibold">2200 kcal</div>
                </div>
              </div>
            </AppBlock>
            <AppBlock>
              <div className="w-full flex flex-row gap-5 items-center">
                <FaWeight className="w-10 h-10" />
                <div className="flex flex-col gap-2">
                  <div className="text-md text-bold">Weight Goal</div>
                  <div className="text-lg font-semibold">70 kg</div>
                </div>
              </div>
            </AppBlock>
          </div>
        </div>
      </div>
    </div>

    </BasicPage>
  </PageContainer>
  );
};
