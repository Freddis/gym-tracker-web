import {FC} from 'react';
import {Exercise} from '../../../../../src/frontend/common/utils/openapi-client';
import {AppImage} from '../../../../../src/frontend/common/components/atoms/AppImage/AppImage';
import {AppLink} from '../../../../../src/frontend/common/components/atoms/AppLink/AppLink';
import {IphoneDisplay} from '../../../../components/IphoneDisplay/IphoneDisplay';
import {MobileScreenContainer} from '../../../../components/MobileScreenContainer/MobileScreenContainer';
import {useAppPartialTranslation} from '../../../../../src/frontend/website/utils/i18n/useAppPartialTranslation';

export const ExerciseScreen: FC<{exercise:Exercise}> = ({exercise}) => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.exercise);
  const descriptionParagraphs = exercise.description?.split(/<[0-9]>/) ?? [];
  const firstImage = exercise.images?.[0];

  return (
    <IphoneDisplay tab={2} title={exercise.name} rightButton="Edit">
      <MobileScreenContainer className="bg-surface ">
        <div className="flex-1 overflow-y-auto space-y-4">
          {firstImage && (
            <div className="flex justify-center w-full  bg-white">
              <AppImage src={firstImage} className="w-auto h-64 object-contain" />
            </div>
          )}
          <div className="grow ">
            <div className="flex flex-col sm:flex-row sm:items-end">
              <div className="text-base grow">
                <div>
                  <span className="font-normal">{t(i18n.labels.equipment)} </span>
                  {exercise.equipment && (
                    <AppLink className="text-on-surface capitalize" >
                      {translations.utils.objects.equipment[exercise.equipment]}
                    </AppLink>
                  )}
                  {!exercise.equipment && <span>None</span>}
                </div>
                <div>
                  <span className="font-normal">{t(i18n.labels.primaryMuscles)} </span>
                  {exercise.muscles.primary.map((muscle, i) => (
                    <AppLink key={i} className="text-base text-on-surface mr-1 inline-block">
                      {translations.utils.objects.muscles[muscle]}
                    </AppLink>
                  ))}
                </div>
                <div>
                  <span className="font-normal">{t(i18n.labels.secondaryMuscles)} </span>
                  {exercise.muscles.secondary.map((muscle, i) => (
                    <AppLink key={i} className="text-base text-on-surface mr-1 inline-block">
                      {translations.utils.objects.muscles[muscle]}
                    </AppLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {descriptionParagraphs.length > 0 && (
            <div className="space-y-3">
              {descriptionParagraphs.map((paragraph, i) => (
                <p key={i.toString()} className="text-on-surface">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>
      </MobileScreenContainer>
    </IphoneDisplay>
  );
};
