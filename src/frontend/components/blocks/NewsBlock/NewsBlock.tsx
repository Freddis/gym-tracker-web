import {FC} from 'react';
import {AppAvatar} from '../../atoms/AppAvatar/AppAvatar';
import {User} from '../../../utils/openapi-client';
import {StorybookDataUtils} from '../../../../../storybook/utils/StorybookDataUtils/StorybookDataUtils';

export const NewsBlock: FC<{own?: boolean}> = ({own = false}) => {
  const user: User = {
    ...StorybookDataUtils.getUser(),
    profilePicture: '',
  };

  return (
    <div className="bg-surface text-on-surface flex flex-col shadow-neutral-shadow shadow-md rounded-md">
      <img className="h-50 md:h-100 w-full object-cover rounded-t-md" src="/images/pages/home/news2.jpg" />
      <div className="p-5 grow flex flex-col">
        <h3 className="uppercase mb-2 font-semibold">Gained 10 pounds in 3 months</h3>
        <p>
        10lbs of muscle after 50 is doable but to achieve it in a year will require a
          lot of hard work and discipline. My strategy will be to consult ...
          <span className="text-accent block">Read More</span>
          </p>
        {!own && (
          <div className="grow flex flex-row-reverse">
            <div className="flex flex-row  items-center">
              <span className="text-accent">{user.name}</span>
              <AppAvatar user={user} className="ml-2"/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
