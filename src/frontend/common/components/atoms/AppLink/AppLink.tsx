import {AnchorHTMLAttributes, forwardRef, ReactNode} from 'react';
import {cn} from '../../../utils/cn';

export interface AppLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'bold' | 'normal',
  accented?: boolean,
  children: ReactNode
}

export const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>(
  (props, ref) => {
    const {accented, ...rest} = props;
    const accentedValue = accented === undefined ? true : accented;
    return <a ref={ref} {...rest} className={cn('hover:text-accent cursor-pointer', accentedValue ? 'text-accent' : '', props.className)}/>;
  },
);
