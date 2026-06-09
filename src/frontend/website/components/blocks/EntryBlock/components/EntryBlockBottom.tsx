import {FC} from 'react';
import {AppAvatar} from '../../../../../common/components/atoms/AppAvatar/AppAvatar';
import {FeedEntry} from '../../../../../common/utils/openapi-client';

export const EntryBlockBottom: FC<{entry: FeedEntry, own?: boolean}> = ({entry, own}) => {
  if (own) {
    return null;
  }
  return (
    <div className="grow flex flex-row-reverse mt-5">
      <div className="flex flex-row items-center">
        <span className="text-accent">{entry.user.name}</span>
        <AppAvatar user={entry.user} className="ml-2"/>
      </div></div>
  );
};
