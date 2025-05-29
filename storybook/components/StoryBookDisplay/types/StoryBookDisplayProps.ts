import {ReactNode} from 'react';
import {PaletteName} from '../../../../src/frontend/enums/PaletteName';
import {StoryBookDisplayType} from '../enums/StoryBookDisplayType';

export interface StoryBookDisplayProps {
  story: ReactNode,
  className?: string,
  palette?: PaletteName,
  column?:boolean,
  user?: boolean
  type?: StoryBookDisplayType
}
