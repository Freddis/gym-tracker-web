import {FC, useState} from 'react';
import {Exercise} from 'src/frontend/openapi-client';
import {AppImage} from '../../../atoms/AppImage/AppImage';
import {AppLink} from '../../../atoms/AppLink/AppLink';
import {AppBlock} from '../../../atoms/AppBlock/AppBlock';
import {FaChevronDown, FaChevronUp} from 'react-icons/fa';

type ExerciseBlockProps = {
  item: Exercise & { variations?: Exercise[] };
};

export const ExerciseBlock: FC<ExerciseBlockProps> = (props) => {
  const item = props.item;
  const [showVariations, setShowVariations] = useState(false);
  const toggleVariationsDisplay = () => {
    setShowVariations(!showVariations);
  };
  const variationsButtonCaption = showVariations
    ? 'Hide Variations'
    : 'Show Variations';
  return (
    <AppBlock className={props.item.variations ? '' : ''}>
      <div className="flex  gap-2 items-start">
        <AppImage src={item.images[0]} className="mt-1" />
        <div className="grow">
          <div className="mb-2">
            <AppLink to="/exercises/update/$exerciseId" params={{exerciseId: item.id.toString()}}>
              <b>{item.name}</b>
            </AppLink>
          </div>
          <div className="flex items-end">
            <div className="text-base">
              <div>
                <span className="font-normal">Equipment: </span>
                <AppLink className="text-on-surface">Barbell</AppLink>
              </div>
              <div>
                <span className="font-normal">Primary: </span>
                <AppLink className="text-on-surface">Chest</AppLink>
                </div>
              <div>
                <span className="font-normal">Secondary: </span>
                <AppLink className="text-on-surface">Triceps, </AppLink>
                <AppLink className="text-on-surface">Shoulders</AppLink>
              </div>
            </div>
            <div className="grow flex flex-row-reverse">
            {item.variations && (
              <AppLink className="font-normal" onClick={toggleVariationsDisplay}>
                <span>{variationsButtonCaption}</span>
                {!showVariations && <FaChevronDown className="ml-2 inline" />}
                {showVariations && <FaChevronUp className="ml-2 inline" />}
              </AppLink>
            )}
            </div>
          </div>
        </div>
      </div>
      {showVariations && (
        <div className={'bg-cavity flex flex-col gap-3 p-3 mt-3 rounded-sm transition-opacity duration-500'}>
          {item.variations?.map((item) => <ExerciseBlock key={item.id} item={item} />)}
        </div>
      )}
    </AppBlock>
  );
};
