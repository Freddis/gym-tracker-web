import {ReactNode, FC, useState, useEffect, TransitionEventHandler} from 'react';
import {cn} from '../../../utils/cn';

interface AnimatedProps {
 show: boolean
 className: string
 animation: string
 children: ReactNode
}
export const Animated: FC<AnimatedProps> = ({children, show, animation, className}) => {
  const [rendered, setRendered] = useState(show);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setRendered(true);
      // wait two frames so hidden state paints before showing
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
    }
  };
  if (!rendered) {
    return null;
  }
  return (
    <div className={cn(className, visible ? animation : '')} onTransitionEnd={onTransitionEnd}>{children}</div>
  );
};
