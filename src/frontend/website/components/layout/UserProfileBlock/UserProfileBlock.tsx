import {FC} from 'react';
import {AppSidebarBlock} from '../../../../common/components/atoms/AppSidebarBlock/AppSidebarBlock';
import {User} from '../../../../common/utils/openapi-client';
import {route, RouteId} from '../../../../common/utils/route';
import {RouteLink} from '../../../../common/components/atoms/RouteLink/RouteLink';
import {useAppPartialTranslation} from '../../../utils/i18n/useAppPartialTranslation';
import {AppAvatar} from '../../../../common/components/atoms/AppAvatar/AppAvatar';

export const UserProfileBlock: FC<{user: User, own?:boolean}> = (props) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages);
  return (
    <AppSidebarBlock>
    <div className="flex flex-col items-center">
      <AppAvatar user={props.user} className="w-30 h-30 text-4xl rounded-sm" />
    </div>
    <div className="text-center bold">{props.user.name}</div>
    {/* <div className="text-center text-sm">Russia</div> */}
    <div className="w-full flex flex-col mt-5">
      <div className="border-t-1 border-on-surface/20 p-2">
        <RouteLink accented={false} to={route(RouteId.Profile)}>
          {t(i18n.profile.heading)}
        </RouteLink>
      </div>
      <div className="border-t-1 border-on-surface/20 p-2">
        <RouteLink accented={false} to={route(RouteId.EntryList)}>
          {t(i18n.activities.list.heading)}
        </RouteLink>
      </div>
      <div className="border-t-1 border-on-surface/20 p-2">
        <RouteLink accented={false} to={route(RouteId.ExerciseList)}>
          {t(i18n.exercises.list.heading)}
        </RouteLink>
      </div>
      <div className="border-t-1 border-on-surface/20 p-2">
        <RouteLink accented={false} to={route(RouteId.WorkoutTypeList)}>
          {t(i18n.workoutTypes.list.heading)}
        </RouteLink>
      </div>
      <div className="border-t-1 border-on-surface/20 p-2">
        <RouteLink accented={false} to={route(RouteId.FoodList)}>
          {t(i18n.food.list.heading)}
        </RouteLink>
      </div>
      {props.own && (
        <div className="border-t-1 border-on-surface/20 p-2">
          <RouteLink accented={false} to={route(RouteId.Settings)}>
            {t(i18n.settings.view.heading)}
          </RouteLink>
        </div>
      )}
    </div>
  </AppSidebarBlock>
  );
};

