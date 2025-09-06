import {Color} from './types/Color';
import {neutralPalette} from './palettes/neutralPalette';
import {neutralDarkPalette} from './palettes/neutralDarkPalette';
import {dangerPalette} from './palettes/dangerPalette';
import {warningPalette} from './palettes/warningPalette';
import {infoPalette} from './palettes/infoPalette';
import {successPalette} from './palettes/successPalette';
import {accentPalette} from './palettes/accentPalette';
import {lightestDarkPalette} from './palettes/lightestDarkPalette';
import {lightestPalette} from './palettes/lightestPalette';
import {darkestPalette} from './palettes/darkestPalette';
import {darkestDarkPalette} from './palettes/darkestDarkPallete';
import {PaletteSet} from './types/PaletteSet';

export const palettes: PaletteSet = {
  [Color.Neutral]: {
    dark: {
      ...neutralDarkPalette,
      surface: {
        ...lightestDarkPalette,
        cavity: neutralDarkPalette,
      },
      cavity: {
        text: 'white',
        color: 'var(--color-black)',
      },
    },
    light: {
      ...neutralPalette,
      surface: {
        ...lightestPalette,
        cavity: neutralPalette,
      },
      cavity: {
        text: 'black',
        color: 'var(--color-neutral-300)',
      },
    },
  },
  [Color.Lightest]: {
    dark: {
      ...lightestDarkPalette,
      surface: neutralDarkPalette,
      cavity: lightestDarkPalette,
    },
    light: {
      ...lightestPalette,
      surface: neutralPalette,
      cavity: lightestPalette,
    },
  },
  [Color.Darkest]: {
    dark: {
      ...darkestDarkPalette,
      surface: neutralDarkPalette,
      cavity: darkestDarkPalette,
    },
    light: {
      ...darkestPalette,
      surface: lightestPalette,
      cavity: darkestPalette,
    },
  },
  [Color.Danger]: {
    dark: dangerPalette,
    light: dangerPalette,
  },
  [Color.Warning]: {
    dark: warningPalette,
    light: warningPalette,
  },
  [Color.Info]: {
    dark: infoPalette,
    light: infoPalette,
  },
  [Color.Success]: {
    dark: successPalette,
    light: successPalette,
  },
  [Color.Accent]: {
    dark: accentPalette,
    light: accentPalette,
  },
};
