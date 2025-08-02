import {FC, MouseEventHandler, useState} from 'react';
import {AppImage} from '../../../../atoms/AppImage/AppImage';
import {AppLink} from '../../../../atoms/AppLink/AppLink';
import {AppBlock} from '../../../../atoms/AppBlock/AppBlock';
import {FaChevronDown, FaChevronUp} from 'react-icons/fa';
import {ExerciseLibraryQueryParams} from '../types/ExercisesLibraryQuery';
import {ExerciseBlockProps} from './types/ExerciseBlockProps';
import {Muscle} from '../../../../../utils/openapi-client';

export const ExerciseBlock: FC<ExerciseBlockProps> = (props) => {
  const item = props.item;
  const [showVariations, setShowVariations] = useState(false);
  const toggleVariationsDisplay: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    setShowVariations(!showVariations);
  };
  const getSearch = (muscle: Muscle): ExerciseLibraryQueryParams => {
    const newParams = {...props.params, muscles: [muscle]};
    return newParams;
  };
  return (
    <AppBlock>
      <div className="flex  gap-2 items-start">
        <AppImage src={item.images[0]} className="mt-1" />
        <div className="grow">
          <div className="mb-2">
            <AppLink to="/exercises/$exerciseId" params={{exerciseId: item.id.toString()}}>
              <b>{item.name}</b>
            </AppLink>
          </div>
          <div className="flex items-end">
            <div className="text-base  grow">
              <div>
                <span className="font-normal">Equipment: </span>
                <AppLink className="text-on-surface capitalize">{item.equipment}</AppLink>
              </div>
              <div>
                <span className="font-normal">Primary: </span>
                {props.item.muscles.primary.map((muscle, i) => (
                  <AppLink key={i} search={getSearch(muscle)} className="text-on-surface mr-1">{muscle}</AppLink>
                ))}
                </div>
              <div>
                <span className="font-normal">Secondary: </span>
                {props.item.muscles.secondary.slice(0, 3).map((muscle, i) => (
                  <AppLink key={i} search={getSearch(muscle)} className="text-on-surface mr-1 ">{muscle}</AppLink>
                ))}
                {props.item.muscles.secondary.length > 3 && <span className="text-xs">and more...</span>}
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
      {showVariations && (
        <div className={'bg-cavity flex flex-col gap-3 p-3 mt-3 rounded-sm transition-opacity duration-500'}>
          {item.variations?.map((item) => <ExerciseBlock key={item.id} item={{...item, variations: []}} />)}
        </div>
      )}
    </AppBlock>
  );
};
