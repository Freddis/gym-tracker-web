import {LinkComponentProps, useLocation} from '@tanstack/react-router';
import {FC} from 'react';
import {AppLink} from '../../../atoms/AppLink/AppLink';
import {twMerge} from 'tailwind-merge';

export const HeaderLink: FC<LinkComponentProps> = (props) => {
  const location = useLocation();
  const isActive = location.pathname === props.to;
  const activeClass = isActive ? 'text-accent font-normal' : '';
  const classes = twMerge('uppercase text-base font-light text-on-main transition-colors ', activeClass);
  return (
    <AppLink {...props} className={classes}>{props.children}</AppLink>
  );
};
