import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {AppBlock} from '../../../atoms/AppBlock/AppBlock';
import {AppLink} from '../../../atoms/AppLink/AppLink';
import {AppButton} from '../../../atoms/AppButton/AppButton';

export function AddEntryPage() {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities);

  return (
  <PageContainer className="bg-main">
    <div className="flex flex-col max-w-5xl w-full">
      <div className="mb-5 -mt-5">
        <AppLink to="/entries">{t(i18n.list.heading)}</AppLink>
        <span className="ml-2">&gt;&gt;</span>
        <span className="ml-2">{t(i18n.create.heading)}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-5 items-start">
        <AppBlock>
          <div className="flex flex-col md:flex-row gap-10 p-10 justify-center">
            <AppLink to="/workouts/create">
              <AppButton>{t(i18n.create.buttons.addWorkout)}</AppButton>
            </AppLink>
            <AppLink to="/weight/create">
              <AppButton>{t(i18n.create.buttons.addWeight)}</AppButton>
            </AppLink>
          </div>
        </AppBlock>
      </div>
    </div>
  </PageContainer>
  );
}
