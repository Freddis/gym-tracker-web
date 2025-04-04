import {FC, ReactNode, useState, CSSProperties, MouseEventHandler} from 'react';

export const Popup: FC<{
  contentProvider: (callback: (node: ReactNode| null) => void) => void,
  onClose?: ()=> void
  }> = (props) => {
    const [content, setContent] = useState<ReactNode| null>(null);
    props.contentProvider((content) => {
      setContent(content);
    });
    const backgroundStyle: CSSProperties = {
      position: 'absolute',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      zIndex: 10,
    };
    const containerStyle: CSSProperties = {
      padding: 10,
      background: '#0f1214',
      borderRadius: 5,
      margin: '0 auto',
      color: 'white',
      display: 'inline-block',
    };
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
    <div style={backgroundStyle} onClick={close}>
      <div style={containerStyle} onClick={stopPropagation}>{content}</div>
    </div>
    );
  };
