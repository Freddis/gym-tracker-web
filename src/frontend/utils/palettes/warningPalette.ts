import {Color} from '../../enums/Color';
import {Palette} from '../../types/Palette';

export const warningPalette: Palette<Color.Warning> = {
  color: 'var(--color-orange-100)',
  text: 'var(--color-orange-900)',
  name: Color.Warning,
  surface: {
    color: 'var(--color-orange-300)',
    text: 'var(--color-orange-900)',
  },
  cavity: {
    color: 'var(--color-orange-100)',
    text: 'var(--color-orange-900)',
  },
};
