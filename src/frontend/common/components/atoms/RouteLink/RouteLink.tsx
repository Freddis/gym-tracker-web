import {createLink, LinkComponent, useMatchRoute} from '@tanstack/react-router';
import {AppLink} from '../AppLink/AppLink';
import {cn} from '../../../utils/cn';

// That's the tricky part. Use of createLink is justified only in cases where
// you have <a> component already and what to preserve it (i.e. it comes from UI library)
// In our case I don't have good justification, just didn't want to style it twice for href and route links
const CreatedLinkComponent = createLink(AppLink);

export const RouteLink: LinkComponent<typeof AppLink> = (props) => {

  const matchRoute = useMatchRoute();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isActive = matchRoute(props as any);
  const activeClass = isActive ? 'text-accent' : '';
  const newProps = {
    ...props,
    className: cn(props.className, activeClass),
  };

  return <CreatedLinkComponent preload="intent" {...newProps} />;
};
