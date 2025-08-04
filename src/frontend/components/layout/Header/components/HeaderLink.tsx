import {LinkComponentProps, useLocation} from '@tanstack/react-router';
import {FC} from 'react';
import {AppLink} from '../../../atoms/AppLink/AppLink';
import {cn} from '../../../../utils/cn';

export const HeaderLink: FC<LinkComponentProps> = (props) => {
  const location = useLocation();
  const isActive = location.pathname === props.to;
  const activeClass = isActive ? 'text-accent scale-103' : '';
  return (
    <AppLink
    {...props} className={cn('uppercase text-base font-light text-on-main transition-all ', activeClass)}
    >{props.children}</AppLink>
  );
};
