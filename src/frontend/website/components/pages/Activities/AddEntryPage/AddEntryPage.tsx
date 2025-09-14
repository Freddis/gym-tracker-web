import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {PageContainer} from '../../../../../common/components/layout/PageContainer/PageContainer';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {RouteLink} from '../../../../../common/components/atoms/RouteLink/RouteLink';
import {AppButton} from '../../../../../common/components/atoms/AppButton/AppButton';
import {route, RouteId} from '../../../../../common/utils/route';

export function AddEntryPage() {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities);

  return (
  <PageContainer className="bg-main">
    <div className="flex flex-col max-w-5xl w-full">
      <div className="mb-5 -mt-5">
        <RouteLink to={route(RouteId.EntryList)}>{t(i18n.list.heading)}</RouteLink>
        <span className="ml-2">&gt;&gt;</span>
        <span className="ml-2">{t(i18n.create.heading)}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-5 items-start">
        <AppBlock>
          <div className="flex flex-col md:flex-row gap-10 p-10 justify-center">
            <RouteLink to={route(RouteId.WorkoutCreate)}>
              <AppButton>{t(i18n.create.buttons.addWorkout)}</AppButton>
            </RouteLink>
            <RouteLink to={route(RouteId.WeightCreate)}>
              <AppButton>{t(i18n.create.buttons.addWeight)}</AppButton>
            </RouteLink>
          </div>
        </AppBlock>
      </div>
    </div>
  </PageContainer>
  );
}
