import {ReactNode} from 'react';
import {Color} from '../../../../src/frontend/utils/design-system/types/Color';
import {StoryBookDisplayType} from '../enums/StoryBookDisplayType';

export interface StoryBookDisplayProps {
  story: ReactNode,
  className?: string,
  palette?: Color,
  column?:boolean,
  user?: boolean
  type?: StoryBookDisplayType
}
