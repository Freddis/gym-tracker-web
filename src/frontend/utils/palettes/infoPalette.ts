import {Color} from '../../enums/Color';
import {Palette} from '../../types/Palette';

export const infoPalette: Palette<Color.Info> = {
  color: 'var(--color-blue-100)',
  text: 'var(--color-blue-900)',
  name: Color.Info,
  surface: {
    color: 'var(--color-blue-300)',
    text: 'var(--color-blue-900)',
  },
  cavity: {
    color: 'var(--color-blue-100)',
    text: 'var(--color-blue-900)',
  },
};
