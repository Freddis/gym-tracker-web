import {FC} from 'react';
import {StoryBookColorDisplay} from '../StoryBookColorDisplay/StoryBookColorDisplay';
import {Palette} from '../../../types/Palette';

export const StoryBookPaletteDisplay: FC<{palette: Palette}> = (props) => {
  return (
    <div className="table border-collapse m-auto">
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
  );
};
