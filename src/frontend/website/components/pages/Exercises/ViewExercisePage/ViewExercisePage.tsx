import {PageContainer} from '../../../../../common/components/layout/PageContainer/PageContainer';
import {FC, MouseEventHandler, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getRouteApi} from '@tanstack/react-router';
import {ExerciseBlock} from '../ExerciseLibraryPage/components/ExerciseBlock';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {FaChevronDown, FaChevronUp} from 'react-icons/fa';
import {AppImage} from '../../../../../common/components/atoms/AppImage/AppImage';
import {RouteLink} from '../../../../../common/components/atoms/RouteLink/RouteLink';
import {AppBlockHeader} from '../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {AppSpinner} from '../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {AppApiErrorDisplay} from '../../../../../common/components/atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {getExercisesById} from '../../../../../common/utils/openapi-client';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {AppLink} from '../../../../../common/components/atoms/AppLink/AppLink';
import {route, RouteId} from '../../../../../common/utils/route';

const routeApi = getRouteApi('/exercises/$exerciseId');

export const ViewExercisePage:FC = () => {
  const params = routeApi.useParams();
  const [showVariations, setShowVariations] = useState(false);
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.exercise);
  const id = !Number.isNaN(Number(params.exerciseId)) ? Number(params.exerciseId) : 0;
  const response = useQuery({
    queryFn: () => getExercisesById({
      path: {
        id,
      },
    }),
    queryKey: ['exercise', id],
  });
  if (response.isLoading || !response.data) {
    return (
        <PageContainer>
          <AppSpinner/>
        </PageContainer>
    );
  }

  const apiError = response.data?.error;
  if (response.isError || apiError) {
    return (
        <PageContainer>
          <AppApiErrorDisplay error={apiError?.error} />
        </PageContainer>
    );
  }
  const item = response.data.data;


  const toggleVariationsDisplay: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    setShowVariations(!showVariations);
  };
  const descriptionParagraphs = item.description?.split(/<[0-9]>/) ?? [];
  return (
    <PageContainer>
      <div className="w-full max-w-5xl">
        <div className="mb-5 -mt-5">
          <RouteLink to={route(RouteId.ExerciseLibrary)}>{translations.pages.exercises.list.heading}</RouteLink>
          <span className="ml-2">&gt;&gt;</span>
          <span className="ml-2">{item.name}</span>
        </div>
        <AppBlock className="w-full">
          <div className="flex flex-col gap-2 items-start">
            <AppBlockHeader>{item.name}</AppBlockHeader>
            <div className="flex justify-center w-full gap-5">
              {item.images.map((image) => (
                <AppImage src={image} className="mt-1 w-auto h-100 " />
              ))}
            </div>
            <div >
              <div className="flex items-end">
                <div className="text-base  grow">
                  <div>
                    <span className="font-normal">{t(i18n.labels.equipment)} </span>
                    {item.equipment && (
                    <RouteLink
                    className="capitalize"
                    to={route(RouteId.ExerciseLibrary)}
                    search={{equipment: item.equipment}}

                    >{translations.utils.objects.equipment[item.equipment]}</RouteLink>
                    )}
                    {!item.equipment && <span>{t(i18n.placeholders.none)}</span>}
                  </div>
                  <div>
                    <span className="font-normal">{t(i18n.labels.primaryMuscles)} </span>
                    {item.muscles.primary.map((muscle, i) => (
                      <RouteLink key={i} to={route(RouteId.ExerciseLibrary)} search={{muscles: [muscle]}} className="mr-1">
                        {translations.utils.objects.muscles[muscle]}
                        </RouteLink>
                    ))}
                    </div>
                  <div>
                    <span className="font-normal">{t(i18n.labels.secondaryMuscles)} </span>
                    {item.muscles.secondary.slice(0, 3).map((muscle, i) => (
                      <RouteLink key={i} to={route(RouteId.ExerciseLibrary)} search={{muscles: [muscle]}} className=" mr-1 ">
                        {translations.utils.objects.muscles[muscle]}
                      </RouteLink>
                    ))}
                    {item.muscles.secondary.length > 3 && <span className="text-xs">{t(i18n.placeholders.andMore)}</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {descriptionParagraphs.map((x) => <p className="mb-5">{x}</p>)}
          </div>
          <div className="flex flex-row-reverse min-w-25">
            {item.variations.length > 0 && (
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
              {item.variations?.map((item) => <ExerciseBlock key={item.id} item={{...item, variations: []}} />)}
            </div>
          )}

        </AppBlock>
      </div>
    </PageContainer>
  );
};
