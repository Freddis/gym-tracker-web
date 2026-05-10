import {FC, useEffect} from 'react';
import {AppButton} from '../../../../../../common/components/atoms/AppButton/AppButton';
import {AppSpinner} from '../../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {AppToast} from '../../../../../../common/components/atoms/AppToast/AppToast';
import {RouteLink} from '../../../../../../common/components/atoms/RouteLink/RouteLink';
import {BasicPage} from '../../../../../../common/components/layout/BasicPage/BasicPage';
import {PageContainer} from '../../../../../../common/components/layout/PageContainer/PageContainer';
import {Color} from '../../../../../../common/utils/design-system/types/Color';
import {GetWorkoutTypesError, GetWorkoutTypesResponse, User} from '../../../../../../common/utils/openapi-client';
import {route, RouteId} from '../../../../../../common/utils/route';
import {WorkoutTypeBlock} from '../../WorkoutTypeBlock';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';
import {useInView} from 'react-intersection-observer';
import {AppApiErrorDisplay} from '../../../../../../common/components/atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {InfiniteApiResponse} from '../../../../../../common/types/InfiniteApiResponse';
import {UserProfileBlock} from '../../../../layout/UserProfileBlock/UserProfileBlock';
import {AppPageHeading} from '../../../../../../common/components/atoms/AppPageHeading/AppPageHeading';

interface WorkoutTypeListPagePresenterProps {
  response: InfiniteApiResponse<GetWorkoutTypesResponse, GetWorkoutTypesError>;
  user: User;
  onRequireNextPage: () => void;
}

export const WorkoutTypeListPagePresenter: FC<WorkoutTypeListPagePresenterProps> = (props) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.workoutTypes.list);
  const {ref, inView} = useInView({
    rootMargin: '50%',
  });
  const response = props.response;
  useEffect(() => {
    if (inView && response.hasNextPage && !response.isFetchingNextPage) {
      props.onRequireNextPage();
    }
  }, [inView, response.hasNextPage, response.isFetchingNextPage]);
  const apiError = response.data?.pages.find((x) => x.error !== undefined)?.error;
  if (response.isError || apiError) {
    return (
      <PageContainer>
        <AppApiErrorDisplay error={apiError?.error} />
      </PageContainer>
    );
  }
  const items = response.data?.pages.flatMap((x) => x.data?.items).filter((x) => x !== undefined) ?? [];
  return (
    <PageContainer className="bg-main">
    <BasicPage>
      <div className=" w-full flex flex-row gap-5 items-start mb-5">
        {/* <BreadCrumbsBlock breadCrumbs={breadCrumbs} /> */}
        <AppPageHeading>{t(i18n.heading)}</AppPageHeading>
        <div className="grow flex flex-row-reverse">
          <RouteLink to={route(RouteId.WorkoutTypeCreate)}>
            <AppButton>{t(i18n.buttons.add)}</AppButton>
          </RouteLink>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-5 items-start">
        <div className="flex flex-col gap-5">
          <UserProfileBlock user={props.user} own/>
        </div>
        <div className="flex flex-col gap-5 grow w-full">
          {response.isLoading && <AppSpinner />}
          {items.map((item) => <WorkoutTypeBlock key={item.id} item={item}/>)}
          {response.isFetchingNextPage ? <AppSpinner/> : null}
          {!response.isLoading && items.length === 0 && <AppToast variant={Color.Warning}>{t(i18n.toasts.noPlansFound)}</AppToast>}
          <div ref={ref}></div>
        </div>
      </div>
    </BasicPage>
  </PageContainer>
  );
};
