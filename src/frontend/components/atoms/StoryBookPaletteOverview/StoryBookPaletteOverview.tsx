import {FC} from 'react';
import {PaletteName} from '../../../enums/PaletteName';
import {palettes} from '../../../utils/palettes';
import {StoryBookPaletteDisplay} from '../StoryBookPaletteDisplay/StoryBookPaletteDisplay';

export const StoryBookPaletteOverview: FC<{palette: PaletteName}> = (props) => {
  const palette = palettes[props.palette];
  return (
    <div className="flex flex-row h-full w-full justify-center">
      <div className={'theme-light flex items-center justify-center'}>
        <StoryBookPaletteDisplay palette={palette.light}/>
      </div>
      <div className={'theme-dark flex items-center justify-center ml-10'}>
        <StoryBookPaletteDisplay palette={palette.dark} />
      </div>
    </div>
  );
};
