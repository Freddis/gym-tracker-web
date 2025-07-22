import {FC} from 'react';
import {Color} from '../../../../../src/frontend/enums/Color';
import {StoryBookDisplayProps} from '../../types/StoryBookDisplayProps';

export const StoryBookComponentDisplay: FC<StoryBookDisplayProps> = (props) => {
  const palette = props.palette ?? Color.Neutral;
  const baseClasses = `p-10 bg-${palette} text-on-${palette} palette-${palette} flex items-center justify-center`;
  return (
     <div className={baseClasses}>
        <div className={props.className} >
          {props.story}
        </div>
      </div>
  );
};
