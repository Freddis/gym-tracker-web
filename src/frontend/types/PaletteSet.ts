import {PaletteName} from '../enums/PaletteName';
import {Palette} from './Palette';

export type PaletteSet = {
  [key in PaletteName]: {
    dark: Palette,
    light: Palette,
  }
}
