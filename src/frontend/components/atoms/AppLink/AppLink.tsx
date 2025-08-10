import {Link, LinkComponentProps} from '@tanstack/react-router';
import {FC, ReactNode} from 'react';
import {cn} from '../../../utils/cn';

export type AppLinkProps = LinkComponentProps & { variant?: 'bold' | 'normal', accented?: boolean, children: ReactNode };

export const AppLink: FC<AppLinkProps> = (props) => {
  const accented = props.accented === undefined ? true : props.accented;
  if (props.href) {
    return <a {...props} className={cn('hover:text-accent', accented ? 'text-accent' : '', props.className)}></a>;
  };

  return <Link {...props} className={cn('hover:text-accent', accented ? 'text-accent' : '', props.className)}/>;
};
