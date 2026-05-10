import {FC} from 'react';
import {useRequiredAuth} from '../../../../../common/components/layout/AuthProvider/utils/useRequiredAuth';
import {SettingsPagePresenter} from './components/SettingsPagePresenter/SettingsPagePresenter';
import {api} from '../../../../../common/utils/api';
import {keepPreviousData, useQuery} from '@tanstack/react-query';

export const SettingsPage: FC = () => {
  const {user} = useRequiredAuth();
  const response = useQuery({
    queryFn: () => api.getSettings({}),
    queryKey: ['settings'],
    placeholderData: keepPreviousData,
  });
  return <SettingsPagePresenter response={response} user={user} />;
};
