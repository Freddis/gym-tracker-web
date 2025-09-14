import {createContext} from 'react';
import {ToastContextValue} from './ToastContextValue';

export const ToastContext = createContext<ToastContextValue>({
  addWarning: () => { },
  addInfo: () => { },
  addDanger: () => { },
  addSuccess: () => { },
});
