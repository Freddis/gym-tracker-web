import {LinkProps} from '@tanstack/react-router';
import {FC} from 'react';
import {RouteLink} from '../../../../../common/components/atoms/RouteLink/RouteLink';
import {EntryBlockDate} from './EntryBlockDate';
import {Entry} from '../../../../../common/utils/openapi-client';

interface EntryBlockHeaderProps extends LinkProps {
  entry: Entry;
  own?: boolean;
  title: string;
}

export const EntryBlockHeader: FC<EntryBlockHeaderProps> = (props) => {
  const {entry, own, title, ...restProps} = props;
  return (
  <div className="flex flex-col sm:flex-row">
    <div className="text-lg font-normal mb-5">
      {!own && title}
      {own && (
        <RouteLink accented={false} {...restProps}>{title}</RouteLink>
      )}
    </div>
    <div className="grow flex flex-row sm:justify-end">
    <EntryBlockDate date={entry.time} />
    </div>
  </div>
  );
};
