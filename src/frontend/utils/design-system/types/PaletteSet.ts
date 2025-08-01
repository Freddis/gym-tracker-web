import {Color} from './Color';
import {Palette} from './Palette';

export type PaletteSet = {
  [key in Color]: {
    dark: Palette<key>,
    light: Palette<key>,
  }
}
