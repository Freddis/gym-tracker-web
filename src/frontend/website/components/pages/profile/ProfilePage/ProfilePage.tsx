import {FC} from 'react';
import {ProfilePagePresenter} from './components/ProfilePagePresenter';
import {useQuery} from '@tanstack/react-query';
import {api} from '../../../../../common/utils/api';
import {useRequiredAuth} from '../../../../../common/components/layout/AuthProvider/utils/useRequiredAuth';

export const ProfilePage: FC = () => {
  const {user} = useRequiredAuth();
  const response = useQuery({
    queryFn: () => api.getOwnProfile({}),
    queryKey: ['profile'],
  });
  return <ProfilePagePresenter response={response} user={user} own />;
};
