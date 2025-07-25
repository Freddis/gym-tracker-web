import {Link, LinkComponentProps} from '@tanstack/react-router';
import {FC} from 'react';
import {twMerge} from 'tailwind-merge';

type AppLinkProps = LinkComponentProps & { variant?: 'bold' | 'normal', accented?: boolean };

export const AppLink: FC<AppLinkProps> = (props) => {
  const accented = props.accented === undefined ? true : props.accented;
  const classes = [
    'hover:text-accent',
  ];
  if (accented) {
    classes.push('text-accent');
  }
  if (props.variant === 'bold') {
    classes.push('bold');
  }
  return <Link {...props} className={twMerge(classes, props.className)}/>;
};
