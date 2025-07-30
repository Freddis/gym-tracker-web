import {CSSProperties} from 'react';
import {Color} from './Color';

export interface Palette<T extends Color = Color> {
  name: T,
  color: Exclude<CSSProperties['color'], undefined>,
  text: Exclude<CSSProperties['color'], undefined>,
  surface?: Omit<Palette, 'name'>
  cavity?: Omit<Palette, 'name'>
}
