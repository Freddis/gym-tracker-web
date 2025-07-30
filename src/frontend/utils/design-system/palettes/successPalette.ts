import {Color} from '../types/Color';
import {Palette} from '../types/Palette';

export const successPalette: Palette<Color.Success> = {
  color: 'var(--color-emerald-100)',
  text: 'var(--color-emerald-900)',
  name: Color.Success,
  surface: {
    color: 'var(--color-emerald-300)',
    text: 'var(--color-emerald-900)',
  },
  cavity: {
    color: 'var(--color-emerald-100)',
    text: 'var(--color-emerald-900)',
  },
};
