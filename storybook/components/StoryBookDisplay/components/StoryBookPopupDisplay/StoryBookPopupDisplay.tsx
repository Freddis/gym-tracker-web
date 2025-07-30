import {FC} from 'react';
import {Color} from '../../../../../src/frontend/utils/design-system/types/Color';
import {StoryBookDisplayProps} from '../../types/StoryBookDisplayProps';
import {PopupContentWrapper} from '../../../../../src/frontend/components/atoms/Popup/components/PopupContentWrapper';


export const StoryBookPopupDisplay: FC<StoryBookDisplayProps> = (props) => {
  const palette = props.palette ?? Color.Neutral;
  const baseClasses = `bg-${palette} text-on-${palette} flex items-center justify-center`;
  return (
     <div className={baseClasses}>
        <div className="h-300 w-full relative">
          <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full z-10 bg-black/50">
            <PopupContentWrapper>{props.story}</PopupContentWrapper>
          </div>
        </div>
      </div>
  );
};
