import {Color} from '../../enums/Color';
import {Palette} from '../../types/Palette';

export const dangerPalette: Palette<Color.Danger> = {
  color: 'var(--color-red-100)',
  text: 'var(--color-red-400)',
  name: Color.Danger,
  surface: {
    color: 'var(--color-rose-300)',
    text: 'var(--color-rose-900)',
  },
  cavity: {
    color: 'var(--color-rose-100)',
    text: 'var(--color-rose-900)',
  },
};
