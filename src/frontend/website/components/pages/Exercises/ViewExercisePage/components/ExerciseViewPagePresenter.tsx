import {FC, useState, MouseEventHandler} from 'react';
import {FaChevronDown, FaChevronUp} from 'react-icons/fa6';
import {AppBlock} from '../../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {AppImage} from '../../../../../../common/components/atoms/AppImage/AppImage';
import {AppLink} from '../../../../../../common/components/atoms/AppLink/AppLink';
import {RouteLink} from '../../../../../../common/components/atoms/RouteLink/RouteLink';
import {PageContainer} from '../../../../../../common/components/layout/PageContainer/PageContainer';
import {Exercise} from '../../../../../../common/utils/openapi-client';
import {route, RouteId} from '../../../../../../common/utils/route';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';
import {ExerciseBlock} from '../../ExerciseLibraryPage/components/ExerciseBlock/ExerciseBlock';

export const ExerciseViewPagePresenter:FC<{exercise:Exercise}> = ({exercise}) => {
  const [showVariations, setShowVariations] = useState(false);
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.exercise);
  const toggleVariationsDisplay: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    setShowVariations(!showVariations);
  };
  const descriptionParagraphs = exercise.description?.split(/<[0-9]>/) ?? [];

  return (
    <PageContainer>
      <div className="w-full max-w-5xl">
        <div className="mb-5 -mt-5">
          <RouteLink to={route(RouteId.ExerciseLibrary)}>{translations.pages.exercises.list.heading}</RouteLink>
          <span className="ml-2">&gt;&gt;</span>
          <span className="ml-2">{exercise.name}</span>
        </div>
        <AppBlock className="w-full">
          <div className="flex flex-col gap-2 items-start">
            <AppBlockHeader>{exercise.name}</AppBlockHeader>
            <div className="flex justify-center w-full gap-5">
              {exercise.images.map((image, i) => (
                <AppImage key={i.toString()} src={image} className="mt-1 w-auto h-100 " />
              ))}
            </div>
            <div >
              <div className="flex items-end">
                <div className="text-base  grow">
                  <div>
                    <span className="font-normal">{t(i18n.labels.equipment)} </span>
                    {exercise.equipment && (
                    <RouteLink
                    className="capitalize"
                    to={route(RouteId.ExerciseLibrary)}
                    search={{equipment: exercise.equipment}}

                    >{translations.utils.objects.equipment[exercise.equipment]}</RouteLink>
                    )}
                    {!exercise.equipment && <span>{t(i18n.placeholders.none)}</span>}
                  </div>
                  <div>
                    <span className="font-normal">{t(i18n.labels.primaryMuscles)} </span>
                    {exercise.muscles.primary.map((muscle, i) => (
                      <RouteLink key={i} to={route(RouteId.ExerciseLibrary)} search={{muscles: [muscle]}} className="mr-1">
                        {translations.utils.objects.muscles[muscle]}
                        </RouteLink>
                    ))}
                    </div>
                  <div>
                    <span className="font-normal">{t(i18n.labels.secondaryMuscles)} </span>
                    {exercise.muscles.secondary.slice(0, 3).map((muscle, i) => (
                      <RouteLink key={i} to={route(RouteId.ExerciseLibrary)} search={{muscles: [muscle]}} className=" mr-1 ">
                        {translations.utils.objects.muscles[muscle]}
                      </RouteLink>
                    ))}
                    {exercise.muscles.secondary.length > 3 && <span className="text-xs">{t(i18n.placeholders.andMore)}</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {descriptionParagraphs.map((x, i) => <p key={i.toString()} className="mb-5">{x}</p>)}
          </div>
          <div className="flex flex-row-reverse min-w-25">
            {exercise.variations.length > 0 && (
              <AppLink className="font-normal" onClick={toggleVariationsDisplay}>
                <span>
                  <span>{t(i18n.labels.variations)}</span>
                  {!showVariations && <FaChevronDown className="ml-1 inline" />}
                  {showVariations && <FaChevronUp className="ml-1 inline" />}
                </span>
              </AppLink>
            )}
          </div>
          {showVariations && (
            <div className={'bg-cavity flex flex-col gap-3 p-3 mt-3 rounded-sm transition-opacity duration-500'}>
              {exercise.variations?.map((item) => <ExerciseBlock key={item.id} item={{...item, variations: []}} />)}
            </div>
          )}

        </AppBlock>
      </div>
    </PageContainer>
  );
};
