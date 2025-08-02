import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {FC, MouseEventHandler, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getRouteApi} from '@tanstack/react-router';
import {ExerciseBlock} from '../ExerciseLibraryPage/components/ExerciseBlock';
import {AppBlock} from '../../../atoms/AppBlock/AppBlock';
import {FaChevronDown, FaChevronUp} from 'react-icons/fa';
import {AppImage} from '../../../atoms/AppImage/AppImage';
import {AppLink} from '../../../atoms/AppLink/AppLink';
import {AppBlockHeader} from '../../../atoms/AppBlock/components/AppBlockHeader';
import {AppSpinner} from '../../../atoms/AppSpinner/AppSpinner';
import {AppApiErrorDisplay} from '../../../atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {getExercisesById} from '../../../../utils/openapi-client';

const routeApi = getRouteApi('/exercises/$exerciseId');

export const ViewExercisePage:FC = () => {
  const params = routeApi.useParams();
  const [showVariations, setShowVariations] = useState(false);
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
      <div className="max-full w-5xl">
        <div className="mb-5 -mt-5">
          <AppLink to="/exercises">Exercises</AppLink>
          <span className="ml-2">&gt;&gt;</span>
          <span className="ml-2">{item.name}</span>
        </div>
        <AppBlock>
          <div>

          </div>
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
                    <span className="font-normal">Equipment: </span>
                    <AppLink className="text-on-surface capitalize">{item.equipment}</AppLink>
                  </div>
                  <div>
                    <span className="font-normal">Primary: </span>
                    {item.muscles.primary.map((muscle, i) => (
                      <AppLink key={i} to="/exercises" search={{muscles: [muscle]}} className="text-on-surface mr-1">{muscle}</AppLink>
                    ))}
                    </div>
                  <div>
                    <span className="font-normal">Secondary: </span>
                    {item.muscles.secondary.slice(0, 3).map((muscle, i) => (
                      <AppLink key={i} to="/exercises" search={{muscles: [muscle]}} className="text-on-surface mr-1 ">{muscle}</AppLink>
                    ))}
                    {item.muscles.secondary.length > 3 && <span className="text-xs">and more...</span>}
                  </div>
                </div>
                <div className="flex flex-row-reverse min-w-25">
                {item.variations.length > 0 && (
                  <AppLink className="font-normal" onClick={toggleVariationsDisplay}>
                    <span>
                      <span>Variations</span>
                      {!showVariations && <FaChevronDown className="ml-1 inline" />}
                      {showVariations && <FaChevronUp className="ml-1 inline" />}
                    </span>
                  </AppLink>
                )}
                </div>
              </div>
            </div>
          </div>
          <div>
            {descriptionParagraphs.map((x) => <p className="mb-5">{x}</p>)}
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
