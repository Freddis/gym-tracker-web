import {Color} from '../../enums/Color';
import {Palette} from '../../types/Palette';

export const accentPalette: Palette<Color.Accent> = {
  color: 'var(--color-red-600)',
  text: 'white',
  name: Color.Accent,
  surface: {
    color: 'var(--color-red-900)',
    text: 'white',
  },
  cavity: {
    color: 'var(--color-red-600)',
    text: 'white',
  },
};
