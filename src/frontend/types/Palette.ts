import {CSSProperties} from 'react';

export interface Palette {
  color: Exclude<CSSProperties['color'], undefined>,
  text: Exclude<CSSProperties['color'], undefined>,
  surface?: Palette
}
