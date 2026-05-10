import {FC} from 'react';
import {GetUserError, GetUserResponse, ProfilePagePresenter} from './ProfilePagePresenter';
import {useRequiredAuth} from '../../../../../../common/components/layout/AuthProvider/utils/useRequiredAuth';
import {ApiResponse} from '../../../../../../common/types/ApiResponse';

export const ProfilePage: FC = () => {
  const {user} = useRequiredAuth();
  const response: ApiResponse<GetUserResponse, GetUserError> = {
    data: {
      data: user,
      error: undefined,
    },
    isLoading: false,
    isError: false,
  };
  return <ProfilePagePresenter response={response} own />;
};
