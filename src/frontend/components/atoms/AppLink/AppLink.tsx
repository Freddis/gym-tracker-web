import {Link, LinkComponentProps} from '@tanstack/react-router';
import {FC} from 'react';
import {twMerge} from 'tailwind-merge';

export const AppLink: FC<LinkComponentProps> = (props) => {
  return <Link {...props} className={twMerge('text-accent hover:text-accent', props.className)}/>;
};
