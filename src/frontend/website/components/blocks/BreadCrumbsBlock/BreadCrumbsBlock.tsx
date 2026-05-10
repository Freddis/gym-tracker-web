import {FC, Fragment} from 'react';
import {AppLink} from '../../../../common/components/atoms/AppLink/AppLink';
import {BreadCrumb} from './types/BreadCrumb';

export const BreadCrumbsBlock: FC<{breadCrumbs: [BreadCrumb, ...BreadCrumb[]]}> = (props) => {
  const sliced = props.breadCrumbs.slice(0, -1);
  const first = props.breadCrumbs[0];
  const lastOrNothing = props.breadCrumbs[props.breadCrumbs.length - 1];
  const last: BreadCrumb = lastOrNothing ?? first;
  return (
    <div className="mb-5 min-h-8">
      {sliced.map((crumb) => (
        <Fragment key={crumb.url}>
          <AppLink accented={false} href={crumb.url}>{crumb.label}</AppLink>
          <span className="mx-2">&gt;&gt;</span>
        </Fragment>
      ))}
      <span>{last.label}</span>
    </div>
  );
};
