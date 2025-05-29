import {FC, ReactNode, useState, MouseEventHandler} from 'react';
import {PopupContentWrapper} from './components/PopupContentWrapper';

export const Popup: FC<{
  contentProvider: (callback: (node: ReactNode| null) => void) => void,
  onClose?: ()=> void
  }> = (props) => {
    const [content, setContent] = useState<ReactNode| null>(null);
    props.contentProvider((content) => {
      setContent(content);
    });

    const close = () => {
      setContent(null);
      if (props.onClose) {
        props.onClose();
      }
    };
    const stopPropagation: MouseEventHandler<HTMLElement> = (e) => {
      e.stopPropagation();
    };
    if (!content) {
      return null;
    }
    return (
    <div className="fixed flex items-center justify-center w-full h-full z-10 bg-black/50" onClick={close}>
      <PopupContentWrapper onClick={stopPropagation}>{content}</PopupContentWrapper>
    </div>
    );
  };
