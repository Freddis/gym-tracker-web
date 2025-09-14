import {ReactNode, FC, useState, useEffect, TransitionEventHandler, DOMAttributes} from 'react';
import {cn} from '../../../utils/cn';

interface AnimatedProps {
 show: boolean
 className?: string
 animation: string
 children: ReactNode
 onHide?: () => void
}
export const Animated: FC<DOMAttributes<HTMLDivElement> & AnimatedProps> = ({children, onHide, show, animation, className, ...rest}) => {
  const [rendered, setRendered] = useState(show);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setRendered(true);
      // wait timeout so hidden state paints before showing
      requestAnimationFrame(() => {
        setTimeout(() => setVisible(true), 50);
      });
    } else {
      setVisible(false);
    }
  }, [show]);
  const onTransitionEnd:TransitionEventHandler<HTMLDivElement> = (e) => {
    // preventing children from bubbling
    if (!visible && e.target === e.currentTarget) {
      setRendered(false);
      if (onHide) {
        onHide();
      }
    }
  };
  if (!rendered) {
    return null;
  }
  return (
    <div {...rest} className={cn(className, visible ? animation : '')} onTransitionEnd={onTransitionEnd}>{children}</div>
  );
};
