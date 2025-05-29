import {FC} from 'react';
import {PaletteName} from '../../../../../src/frontend/enums/PaletteName';
import {StoryBookDisplayProps} from '../../types/StoryBookDisplayProps';

export const StoryBookComponentDisplay: FC<StoryBookDisplayProps> = (props) => {
  const palette = props.palette ?? PaletteName.Neutral;
  const baseClasses = `p-10 bg-${palette} text-on-${palette} flex items-center justify-center`;
  return (
     <div className={baseClasses}>
        <div className={props.className} >
          {props.story}
        </div>
      </div>
  );
};
