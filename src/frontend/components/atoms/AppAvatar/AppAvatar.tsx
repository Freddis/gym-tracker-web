import {FC} from 'react';
import {User} from '../../../utils/openapi-client';
import {cn} from '../../../utils/cn';

export const AppAvatar: FC<{user: Omit<User, 'profilePicture'>, className?: string}> = ({user, className}) => {
  return (
    <div className={cn('text-white font-bold border-light rounded-full w-10 h-10 flex items-center justify-center bg-cyan-600', className)}>
      {user.name.substring(0, 1)}
    </div>
  );
};

