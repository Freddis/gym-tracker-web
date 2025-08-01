import {FC} from 'react';
import {User} from '../../../utils/openapi-client';
import {cn} from '../../../utils/cn';

export const AppAvatar: FC<{user: User, className?: string}> = ({user, className}) => {
  return (
    // eslint-disable-next-line max-len
    <div className={cn('text-white ml-2 font-bold border-light rounded-full w-12 h-12 flex items-center justify-center bg-cyan-600', className)}>
      {user.name.substring(0, 1)}
    </div>
  );
};

