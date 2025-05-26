import {FC} from 'react';
import {Color} from '../../../src/frontend/enums/Color';
import {StoryBookColorDisplay} from '../StoryBookColorDisplay/StoryBookColorDisplay';
import {colors} from '../../../src/frontend/utils/colors';

export const StoryBookColorOverview: FC = () => {
  const colorNames = Object.values(Color);
  return (
    <div className="table border-collapse m-auto theme-dark">
      {colorNames.map((name) => <StoryBookColorDisplay name={name} value={colors[name]}/>)}
    </div>
  );
};
