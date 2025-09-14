import {ReactNode, FC} from 'react';
import {Popup} from './Popup';
import {PopupContext} from './PopupContext';
import {PopupContextValue} from './types/PopupContextValue';

export const PopupProvider: FC<{children: ReactNode[] | ReactNode}> = (props) => {
  let currentSubscriber: ((node: ReactNode| null) => void) | null = null;
  const contentProvider = (subscriber: (node: ReactNode| null) => void) => {
    currentSubscriber = subscriber;
  };
  const providerProps: PopupContextValue = {
    setContent: function(node: ReactNode): void {
      if (currentSubscriber) {
        currentSubscriber(node);
      }
    },
  };
  return (
  <PopupContext.Provider value={providerProps}>
    <Popup contentProvider={contentProvider} />
    {props.children}
    </PopupContext.Provider>
  );
};
