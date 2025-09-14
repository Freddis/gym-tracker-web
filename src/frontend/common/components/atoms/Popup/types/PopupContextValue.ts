import {ReactNode} from 'react';

export interface PopupContextValue {
  setContent: (node: ReactNode) => void
}
