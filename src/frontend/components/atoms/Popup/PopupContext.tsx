import {createContext} from 'react';
import {PopupContextValue} from './types/PopupContextValue';

export const PopupContext = createContext<PopupContextValue>({
  setContent: () => {},
});
