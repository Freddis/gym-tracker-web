import {FC} from 'react';
import {AppLink} from '../../../../../../atoms/AppLink/AppLink';
import {LinkComponentProps, useLocation} from '@tanstack/react-router';
import {cn} from '../../../../../../../utils/cn';

export const CrmSideMenuLink: FC<LinkComponentProps> = (props) => {
  const location = useLocation();
  const isActive = location.pathname === props.to;
  const activeClass = isActive ? 'text-accent scale-103' : '';
  return <AppLink {...props} className={cn('text-on-main', activeClass)} >{props.children}</AppLink>;
};
