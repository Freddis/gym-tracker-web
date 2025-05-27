import {PaletteName} from '../enums/PaletteName';
import {PaletteSet} from '../types/PaletteSet';

export const palettes: PaletteSet = {
  [PaletteName.Neutral]: {
    dark: {
      color: 'var(--color-neutral-800)',
      text: 'white',
      surface: {
        color: 'var(--color-neutral-900)',
        text: 'white',
      },
      cavity: {
        color: 'black',
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
      cavity: {
        color: '#eee',
        text: '#666',
      },
    },
  },
  [PaletteName.Lightest]: {
    dark: {
      color: 'var(--color-neutral-800)',
      text: 'white',
      surface: {
        color: 'var(--color-neutral-800)',
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
  [PaletteName.Danger]: {
    dark: {
      color: '#f9d4d4',
      text: 'rgb(98.85, 24.15, 24.15)',
    },
    light: {
      color: '#f9d4d4',
      text: 'rgb(98.85, 24.15, 24.15)',
    },
  },
  [PaletteName.Warning]: {
    dark: {
      color: '#feecc5',
      text: 'rgb(112.35, 70.05, 10.65)',
    },
    light: {
      color: '#feecc5',
      text: 'rgb(112.35, 70.05, 10.65)',
    },
  },
  [PaletteName.Info]: {
    dark: {
      color: '#c0e6ff',
      text: 'rgb(28.75, 75.55, 114.25)',
    },
    light: {
      color: '#c0e6ff',
      text: 'rgb(28.75, 75.55, 114.25)',
    },
  },
  [PaletteName.Success]: {
    dark: {
      color: '#cbedd6',
      text: 'rgb(18.6, 83.4, 35.7)',
    },
    light: {
      color: '#cbedd6',
      text: 'rgb(18.6, 83.4, 35.7)',
    },
  },
};
