import {FC, MouseEventHandler, useState} from 'react';
import {FaChevronDown, FaChevronUp} from 'react-icons/fa6';
import {AppImage} from '../../../../../src/frontend/components/atoms/AppImage/AppImage';
import {AppLink} from '../../../../../src/frontend/components/atoms/AppLink/AppLink';
import {useAppPartialTranslation} from '../../../../../src/frontend/utils/i18n/useAppPartialTranslation';
import
{ExerciseBlockProps,
} from '../../../../../src/frontend/components/pages/Exercises/ExerciseLibraryPage/components/types/ExerciseBlockProps';
import {
  ExerciseLibraryQueryParams,
} from '../../../../../src/frontend/components/pages/Exercises/ExerciseLibraryPage/types/ExercisesLibraryQuery';
import {Equipment, Muscle} from '../../../../../src/frontend/utils/openapi-client';
import {MobileBlock} from '../../../../components/MobileScreenContainer/MobileBlock/MobileBlock';

export const MobileExerciseBlock: FC<ExerciseBlockProps> = (props) => {
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
    <MobileBlock className="p-0 py-3">
      <div>
        <AppLink to="/exercises/$exerciseId" params={{exerciseId: item.id.toString()}} className="px-3">
          <b>{item.name}</b>
        </AppLink>
        <div className="px-3 mt-2 flex flex-col sm:flex-row gap-2 items-start">
          <AppImage src={item.images[0]} className="md:mt-1 w-15 h-15 object-cover" />

          <div className="grow">
            <div className="flex flex-col sm:flex-row sm:items-end">
              <div className="text-base grow">
                <div>
                  {/* <FaDumbbell className="inline-block mr-2" /> */}
                  <span className="font-normal">{t(i18n.labels.equipment)} </span>
                  {item.equipment && (
                    <AppLink className="text-on-surface capitalize" search={getEquipmentSearch(item.equipment)}>
                      {translations.utils.objects.equipment[item.equipment]}
                    </AppLink>
                  )}
                  {!item.equipment && <span>None</span>}
                </div>
                <div>
                  <span className="font-normal">{t(i18n.labels.primaryMuscles)} </span>
                  {props.item.muscles.primary.map((muscle, i) => (
                    <AppLink key={i} search={getMuscleSearch(muscle)} className="text-base text-on-surface mr-1 inline-block">
                      {translations.utils.objects.muscles[muscle]}
                    </AppLink>
                  ))}
                  {/* </div>
                <div> */}
                  {/* <span className="font-normal">{t(i18n.labels.secondaryMuscles)} </span> */}
                  {/* {props.item.muscles.secondary.slice(0, 3).map((muscle, i) => (
                    <AppLink key={i} search={getMuscleSearch(muscle)} className="text-base text-on-surface mr-1  inline-block">
                      {translations.utils.objects.muscles[muscle]}
                    </AppLink>
                  ))} */}
                  {/* {props.item.muscles.secondary.length > 3 && <span className="text-xs">{t(i18n.placeholders.andMore)}</span>} */}
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="flex flex-row-reverse min-w-25 px-3">
          {item.variations.length > 0 && (
            <AppLink className="font-normal hidden md:inline-block" onClick={toggleVariationsDisplay}>
              <span className="flex items-center">
                <span>{t(i18n.labels.variations)}</span>
                {!showVariations && <FaChevronDown className="ml-1 inline" />}
                {showVariations && <FaChevronUp className="ml-1 inline" />}
              </span>
            </AppLink>
          )}
        </div>
        {showVariations && (
          <div className={'flex flex-col gap-3 rounded-sm transition-opacity duration-500'}>
            {item.variations?.map((row) => (
              <div>
                <div className="border-b-1 border-on-surface/20 pb-2 mb-2 mx-3" />

                <div className="px-3 flex flex-col sm:flex-row gap-2 items-start">
                  <AppImage src={row.images[0]} className="md:mt-1 w-15 h-15 object-cover" />
                  <div className="grow">
                    <div className="flex flex-col sm:flex-row sm:items-end">
                      <div className="text-base grow">
                         <AppLink to="/exercises/$exerciseId" params={{exerciseId: row.id.toString()}} className="block mb-1">
                          <b>{row.name}</b>
                        </AppLink>
                        <div>
                          {/* <FaDumbbell className="inline-block mr-2" /> */}
                          <span className="font-normal">{t(i18n.labels.equipment)} </span>
                          {row.equipment && (
                            <AppLink className="text-on-surface capitalize" search={getEquipmentSearch(row.equipment)}>
                              {translations.utils.objects.equipment[row.equipment]}
                            </AppLink>
                          )}
                          {!row.equipment && <span>None</span>}
                        </div>
                        <div>
                          <span className="font-normal">{t(i18n.labels.primaryMuscles)} </span>
                          {row.muscles.primary.map((muscle, i) => (
                            <AppLink key={i} search={getMuscleSearch(muscle)} className="text-base text-on-surface mr-1 inline-block">
                              {translations.utils.objects.muscles[muscle]}
                            </AppLink>
                          ))}

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MobileBlock>
  );
};
