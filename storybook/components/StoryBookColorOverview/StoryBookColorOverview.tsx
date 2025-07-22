import {FC} from 'react';
import {Color} from '../../../src/frontend/enums/Color';
import {StoryBookColorDisplay} from '../StoryBookColorDisplay/StoryBookColorDisplay';

export const StoryBookColorOverview: FC = () => {
  const colorNames = Object.values(Color);
  return (
    <div className="table border-collapse m-auto">
      {colorNames.map((name) => <StoryBookColorDisplay key={name} name={name} value={`var(--color-${name})`}/>)}
    </div>
  );
};
