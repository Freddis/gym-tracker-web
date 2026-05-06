import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {PageContainer} from '../../../../../common/components/layout/PageContainer/PageContainer';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {RouteLink} from '../../../../../common/components/atoms/RouteLink/RouteLink';
import {AppButton} from '../../../../../common/components/atoms/AppButton/AppButton';
import {route, RouteId} from '../../../../../common/utils/route';
import {BreadCrumbs} from '../../../blocks/BreadCrumbsBlock/types/BreadCrumbs';
import {BreadCrumbsBlock} from '../../../blocks/BreadCrumbsBlock/BreadCrumbsBlock';
import {BasicPage} from '../../../../../common/components/layout/BasicPage/BasicPage';

export function AddEntryPage() {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities);
  const breadCrumbs: BreadCrumbs = [
    {label: t(i18n.list.heading), url: route(RouteId.EntryList)},
    {label: t(i18n.create.heading), url: route(RouteId.EntryAdd)},
  ];
  return (
  <PageContainer className="bg-main">
    <BasicPage>
      <BreadCrumbsBlock breadCrumbs={breadCrumbs} />
      <div className="flex flex-col md:flex-row gap-5 items-start">
        <AppBlock>
          <div className="flex flex-col md:flex-row gap-10 p-10 justify-center">
            <RouteLink to={route(RouteId.WorkoutCreate)}>
              <AppButton>{t(i18n.create.buttons.addWorkout)}</AppButton>
            </RouteLink>
            <RouteLink to={route(RouteId.WeightCreate)}>
              <AppButton>{t(i18n.create.buttons.addWeight)}</AppButton>
            </RouteLink>
            <RouteLink to={route(RouteId.PostCreate)}>
              <AppButton>{t(i18n.create.buttons.addPost)}</AppButton>
            </RouteLink>
          </div>
        </AppBlock>
      </div>
    </BasicPage>
  </PageContainer>
  );
}
