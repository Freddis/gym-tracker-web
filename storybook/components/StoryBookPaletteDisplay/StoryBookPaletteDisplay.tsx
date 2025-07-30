import {FC} from 'react';
import {StoryBookColorDisplay} from '../StoryBookColorDisplay/StoryBookColorDisplay';
import {StoryBookPaletteSampleBlock} from '../StoryBookPaletteSampleBlock/StoryBookPaletteSampleBlock';
import {Palette} from '../../../src/frontend/utils/design-system/types/Palette';

export const StoryBookPaletteDisplay: FC<{palette: Palette}> = (props) => {
  return (
    <div className="flex flex-col">
      <div className="table border-collapse m-auto w-full">
        <StoryBookColorDisplay name="Color" value={props.palette.color}/>
        <StoryBookColorDisplay name="Text" value={props.palette.text}/>
        {props.palette.surface && (
          <>
          <StoryBookColorDisplay name="Surface Color" value={props.palette.surface.color}/>
          <StoryBookColorDisplay name="Surface Text" value={props.palette.surface.text}/>
          </>
        )}
        {props.palette.cavity && (
          <>
          <StoryBookColorDisplay name="Cavity Color" value={props.palette.cavity.color}/>
          <StoryBookColorDisplay name="Cavity Text" value={props.palette.cavity.text}/>
          </>
        )}
      </div>
      <div className={`palette-${props.palette.name} font-extralight`}>
        <StoryBookPaletteSampleBlock/>
      </div>
    </div>
  );
};
