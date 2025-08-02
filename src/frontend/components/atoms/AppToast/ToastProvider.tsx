import {FC, ReactNode, useState} from 'react';
import {Color} from '../../../utils/design-system/types/Color';
import {Toast} from './types/Toast';
import {ToastContext} from './types/ToastContext';
import {ToastContextValue} from './types/ToastContextValue';
import {AppToast} from './AppToast';
import {Animated} from '../Animated/Animated';
import {ToastColor} from './types/ToastColor';

export const ToastProvider: FC<{children: ReactNode}> = ({children}) => {
  const [toast, setToast] = useState<Toast|null>(null);
  const [timeoutHandle, setTimeoutHandle] = useState(setTimeout(() => {}));
  const [showToast, setShowToast] = useState(false);
  const toastDuration = 3000;
  const contextValue: ToastContextValue = {
    addWarning: (text: string) => {
      addToast(text, Color.Warning);
    },
    addInfo: function(text: string): void {
      addToast(text, Color.Info);
    },
    addDanger: function(text: string): void {
      addToast(text, Color.Danger);
    },
    addSuccess: function(text: string): void {
      addToast(text, Color.Success);
    },
  };

  const addToast = (text: string, color: ToastColor) => {
    clearTimeout(timeoutHandle);
    if (toast) {
      setToast(null);
      setShowToast(false);
      // careful, this will act upon old react element element that is not in DOM anymore. Only state should be updated there.
      setTimeout(() => displayToast(text, color), 1);
      return;
    }
    displayToast(text, color);
  };

  const displayToast = (text: string, color: ToastColor) => {
    setToast({text, color});
    setShowToast(true);
    const timeout = setTimeout(() => {
      setShowToast(false);
    }, toastDuration);
    setTimeoutHandle(timeout);
  };

  return (
  <ToastContext.Provider value={contextValue}>
    <>
      {toast && (
        <Animated
          show={showToast}
          animation="opacity-100 translate-y-0"
          className={'px-2 max-w-full right-auto md:right-10 fixed mt-21 duration-500 ease-in-out opacity-0 translate-y-4 transition-all'}
        >
          <AppToast variant={toast.color}>{toast.text}</AppToast>
        </Animated>
      )}
      {children}
    </>
  </ToastContext.Provider>
  );
};
