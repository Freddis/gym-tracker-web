import {FC, useMemo} from 'react';
import {GetOwnProfileError, GetOwnProfileResponse, User} from '../../../../../../common/utils/openapi-client';
import {PageContainer} from '../../../../../../common/components/layout/PageContainer/PageContainer';
import {BasicPage} from '../../../../../../common/components/layout/BasicPage/BasicPage';
import {AppBlock} from '../../../../../../common/components/atoms/AppBlock/AppBlock';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';
import {AppPageHeading} from '../../../../../../common/components/atoms/AppPageHeading/AppPageHeading';
import {ApiResponse} from '../../../../../../common/types/ApiResponse';
import {AppApiErrorDisplay} from '../../../../../../common/components/atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {AppSpinner} from '../../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {AppLabel} from '../../../../../../common/components/atoms/AppLabel/AppLabel';
import {UserProfileBlock} from '../../../../layout/UserProfileBlock/UserProfileBlock';
import {AppButton} from '../../../../../../common/components/atoms/AppButton/AppButton';
import {GoalBlock} from './GoalBlock';
import {wrap} from '../../../../../utils/wrap';
import {AppToast} from '../../../../../../common/components/atoms/AppToast/AppToast';
import {Color} from '../../../../../../common/utils/design-system/types/Color';
import {RouteLink} from '../../../../../../common/components/atoms/RouteLink/RouteLink';
import {route, RouteId} from '../../../../../../common/utils/route';

interface ProfilePagePresenterProps {
 response: ApiResponse<GetOwnProfileResponse, GetOwnProfileError>;
 user: User;
 own?: boolean;
}

export const ProfilePagePresenter: FC<ProfilePagePresenterProps> = (props) => {
  const t = useAppPartialTranslation((x) => x.pages.profile);
  const profile = props.response.data?.data;
  const user = props.user;
  const goals = useMemo(() => profile?.goals.map(wrap) ?? [], [profile]);
  return (
    <PageContainer>
    <BasicPage>
      <div className="w-full text-left mb-5 flex">
        <AppPageHeading>{t.p((x) => x.heading)}</AppPageHeading>
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
        {props.response.isLoading && (
            <AppSpinner />
          )}
          {(props.response.isError || props.response.data?.error?.error) && (
            <AppApiErrorDisplay error={props.response.data?.error?.error} />
          )}
          {profile && (
            <>
            <AppBlock>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2 items-start">
                  <div className="flex w-full">
                    <div className="text-lg grow font-semibold">{t.p((x) => x.labels.about)}</div>
                  </div>
                  <div>
                    <p>{profile.note}</p>
                  </div>
                </div>
                <div className="w-full grid grid-cols-3 gap-">
                  <div>
                    <AppLabel>{t.p((x) => x.labels.height)}</AppLabel>
                    <div>{profile.height} {t.f((x) => x.utils.objects.heightUnits[profile.units.height])}</div>
                  </div>
                  <div>
                    <AppLabel>{t.p((x) => x.labels.weight)}</AppLabel>
                    <div>{profile.weight} {t.f((x) => x.utils.objects.weightUnits[profile.units.weight])}</div>
                  </div>
                  <div>
                    <AppLabel>{t.p((x) => x.labels.age)}</AppLabel>
                    <div>{profile.age} </div>
                  </div>
                </div>
                {/* {props.own && (
                  <div className="flex flex-col gap-2 items-start w-full">
                    <div className="text-lg bold">{t.p((x) => x.labels.visibility)}</div>
                    <div className="font-semibold">Public </div>
                  </div>
                )} */}
              </div>
            </AppBlock>
            <div className="flex flex-col gap-2 items-start w-full">
              <div className="flex flex-row gap-2 w-full items-center">
                <div className="text-lg bold grow">{t.p((x) => x.labels.goals)}</div>
                {props.own && (
                  <RouteLink to={route(RouteId.CalorieGoalCreate)}>
                    <AppButton color="accent">
                      {t.p((x) => x.buttons.addGoal)}
                    </AppButton>
                  </RouteLink>
                )}
              </div>
              <div className="flex flex-col gap-5 w-full">
              {goals.map((goal) => (
                <GoalBlock units={profile.units} key={goal.key} goal={goal.item} consumedCalories={profile.consumedCalories} />
              ))}
              {goals.length === 0 && (
                <AppToast variant={Color.Warning}>{t.p((x) => x.toasts.noGoals)}</AppToast>
              )}
              </div>
            </div>
          </>
          )}
        </div>
      </div>
    </BasicPage>
  </PageContainer>
  );
};
