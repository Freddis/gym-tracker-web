import {createLink, LinkComponent} from '@tanstack/react-router';
import {AppLink} from '../AppLink/AppLink';

// That's the tricky part. Use of createLink is justified only in cases where
// you have <a> component already and what to preserve it (i.e. it comes from UI library)
// In our case I don't have good justification, just didn't want to style it twice for href and route links
const CreatedLinkComponent = createLink(AppLink);

export const RouteLink: LinkComponent<typeof AppLink> = (props) => {

  return <CreatedLinkComponent preload="intent" {...props} />;
};
