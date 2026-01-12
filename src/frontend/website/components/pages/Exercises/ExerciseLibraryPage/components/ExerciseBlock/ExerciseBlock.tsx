import {FC, MouseEventHandler, useState} from 'react';
import {AppImage} from '../../../../../../../common/components/atoms/AppImage/AppImage';
import {AppBlock} from '../../../../../../../common/components/atoms/AppBlock/AppBlock';
import {FaChevronDown, FaChevronUp} from 'react-icons/fa';
import {ExerciseBlockProps} from './types/ExerciseBlockProps';
import {Equipment, Muscle} from '../../../../../../../common/utils/openapi-client';
import {cn} from '../../../../../../../common/utils/cn';
import {useAppPartialTranslation} from '../../../../../../utils/i18n/useAppPartialTranslation';
import {RouteLink} from '../../../../../../../common/components/atoms/RouteLink/RouteLink';
import {AppLink} from '../../../../../../../common/components/atoms/AppLink/AppLink';
import {route, RouteId} from '../../../../../../../common/utils/route';
import {ExerciseLibraryQueryParams} from '../ExerciseLibraryPagePresenter/types/ExercisesLibraryQuery';

export const ExerciseBlock: FC<ExerciseBlockProps> = (props) => {
  const item = props.item;
  const [showVariations, setShowVariations] = useState(false);
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.components.exerciseBlock);
  const toggleVariationsDisplay: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    setShowVariations(!showVariations);
  };
  const getEquipmentSearch = (equipment: Equipment | null): ExerciseLibraryQueryParams => {
    if (!equipment) {
      return {};
    }
    const newParams: ExerciseLibraryQueryParams = {...props.params, equipment};
    return newParams;
  };
  const getMuscleSearch = (muscle: Muscle): ExerciseLibraryQueryParams => {
    const newParams = {...props.params, muscles: [muscle]};
    return newParams;
  };
  return (
    <AppBlock className={cn(props.className)}>
      <div className="flex flex-col sm:flex-row gap-2 items-start">
        <div className="flex w-full justify-center sm:block sm:w-auto shrink-0">
        <AppImage src={item.images[0]} className="md:mt-1 w-auto h-auto max-h-80 sm:w-20 sm:h-20" />
        </div>
        <div className="grow">
          <div className="mb-2">
            <RouteLink to={route(RouteId.Exercise)} params={{exerciseId: item.id.toString()}}>
              <b>{item.name}</b>
            </RouteLink>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end">
            <div className="text-base grow">
              <div>
                <span className="font-normal">{t(i18n.labels.equipment)} </span>
                {item.equipment && (
                  <RouteLink
                    className="text-on-surface capitalize"
                    to={route(RouteId.ExerciseLibrary)}
                    search={getEquipmentSearch(item.equipment)}
                  >
                    {translations.utils.objects.equipment[item.equipment]}
                  </RouteLink>
                )}
                {!item.equipment && <span>{t(i18n.placeholders.none)}</span>}
              </div>
              <div>
                <span className="font-normal">{t(i18n.labels.primaryMuscles)} </span>
                {props.item.muscles.primary.map((muscle, i) => (
                  <RouteLink key={i} to={route(RouteId.ExerciseLibrary)} search={getMuscleSearch(muscle)} className="text-on-surface mr-1">
                    {translations.utils.objects.muscles[muscle]}
                  </RouteLink>
                ))}
                </div>
              <div>
                <span className="font-normal">{t(i18n.labels.secondaryMuscles)} </span>
                {props.item.muscles.secondary.slice(0, 3).map((muscle, i) => (
                  <RouteLink key={i} to={route(RouteId.ExerciseLibrary)} search={getMuscleSearch(muscle)} className="text-on-surface mr-1 ">
                    {translations.utils.objects.muscles[muscle]}
                  </RouteLink>
                ))}
                {props.item.muscles.secondary.length > 3 && <span className="text-xs">{t(i18n.placeholders.andMore)}</span>}
              </div>
            </div>
            <div className="flex flex-row-reverse min-w-25">
            {item.variations.length > 0 && (
              <AppLink className="font-normal hidden md:inline-block" onClick={toggleVariationsDisplay}>
                <span>
                  <span>{t(i18n.labels.variations)}</span>
                  {!showVariations && <FaChevronDown className="ml-1 inline" />}
                  {showVariations && <FaChevronUp className="ml-1 inline" />}
                </span>
              </AppLink>
            )}
            </div>
          </div>
        </div>
      </div>
      {showVariations && (
        <div className={'bg-cavity flex flex-col gap-3 p-3 mt-3 rounded-sm transition-opacity duration-500'}>
          {item.variations?.map((item) => <ExerciseBlock key={item.id} item={{...item, variations: []}} />)}
        </div>
      )}
    </AppBlock>
  );
};
