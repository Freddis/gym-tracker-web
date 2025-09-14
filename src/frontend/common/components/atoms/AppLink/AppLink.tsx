import {AnchorHTMLAttributes, forwardRef, ReactNode} from 'react';
import {cn} from '../../../utils/cn';

export interface AppLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'bold' | 'normal',
  accented?: boolean,
  children: ReactNode
}

export const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>(
  (props, ref) => {
    const accented = props.accented === undefined ? true : props.accented;
    return <a ref={ref} {...props} className={cn('hover:text-accent', accented ? 'text-accent' : '', props.className)}/>;
  },
);
