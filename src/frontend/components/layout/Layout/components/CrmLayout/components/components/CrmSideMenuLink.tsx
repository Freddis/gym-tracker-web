import {FC} from 'react';
import {AppLink, AppLinkProps} from '../../../../../../atoms/AppLink/AppLink';
import {useLocation} from '@tanstack/react-router';
import {cn} from '../../../../../../../utils/cn';

export const CrmSideMenuLink: FC<AppLinkProps> = (props) => {
  const location = useLocation();
  const isActive = location.pathname === props.to;
  const activeClass = isActive ? 'text-accent scale-103' : '';
  return <AppLink {...props} className={cn('text-on-main', activeClass)} >{props.children}</AppLink>;
};
