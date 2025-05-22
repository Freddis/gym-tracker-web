import {PaletteName} from '../enums/PaletteName';
import {PaletteSet} from '../types/PaletteSet';


export const palettes: PaletteSet = {
  [PaletteName.Neutral]: {
    dark: {
      color: '#111',
      text: 'white',
      surface: {
        color: '#333',
        text: 'white',
      },
    },
    light: {
      color: '#f8f8f8',
      text: '#666',
      surface: {
        color: 'white',
        text: '#333',
      },
    },
  },
  [PaletteName.Lightest]: {
    dark: {
      color: '#333',
      text: 'white',
      surface: {
        color: '#111',
        text: 'white',
      },
    },
    light: {
      color: 'white',
      text: '#333',
      surface: {
        color: 'white',
        text: '#333',
      },
    },
  },
  [PaletteName.Darkest]: {
    dark: {
      color: 'black',
      text: 'white',
      surface: {
        color: '#333',
        text: 'white',
      },
    },
    light: {
      color: 'black',
      text: 'white',
      surface: {
        color: 'white',
        text: 'black',

      },
    },
  },
};
