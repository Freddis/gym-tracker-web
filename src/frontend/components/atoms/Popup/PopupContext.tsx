import {createContext} from 'react';
import {PopupContextValue} from './types/PopupContextValue';

export const PopupContext = createContext<PopupContextValue>({
  // eslint-disable-next-line no-empty-function
  setContent: () => {},
});
