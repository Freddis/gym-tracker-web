import {LinkComponent, useMatchRoute} from '@tanstack/react-router';
import {cn} from '../../../../../../../utils/cn';
import {RouteLink} from '../../../../../../atoms/RouteLink/RouteLink';

export const CrmSideMenuLink: LinkComponent<typeof RouteLink> = (props) => {
  const matchRoute = useMatchRoute();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isActive = matchRoute(props as any);
  const activeClass = isActive ? 'text-accent scale-103' : '';
  const newProps = {
    ...props,
    className: cn('text-on-main', activeClass, props.className),
  };
  return (
    <RouteLink {...newProps} />
  );
};
