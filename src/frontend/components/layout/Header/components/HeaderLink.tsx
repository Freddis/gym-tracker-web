import {LinkComponentProps} from '@tanstack/react-router';
import {FC} from 'react';
import {AppLink} from '../../../atoms/AppLink/AppLink';

export const HeaderLink: FC<LinkComponentProps> = (props) => {
  return (
    <AppLink {...props} className={'uppercase text-base '}>{props.children}</AppLink>
  );
};
