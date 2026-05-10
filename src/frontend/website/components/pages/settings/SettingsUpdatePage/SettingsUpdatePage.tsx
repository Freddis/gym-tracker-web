import {FC} from 'react';
import {
  SettingsUpdatePagePresenter,
} from './components/SettingsUpdatePagePresenter/SettingsUpdatePagePresenter';
import {useRequiredAuth} from '../../../../../common/components/layout/AuthProvider/utils/useRequiredAuth';
import {useQuery, keepPreviousData, useQueryClient} from '@tanstack/react-query';
import {api} from '../../../../../common/utils/api';
import {Settings, SettingsUpdateDto} from '../../../../../common/utils/openapi-client';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {useNavigate} from '@tanstack/react-router';
import {route, RouteId} from '../../../../../common/utils/route';
import {useAuth} from '../../../../../common/components/layout/AuthProvider/utils/useAuth';

export const SettingsUpdatePage: FC = () => {
  const {user} = useRequiredAuth();
  const toasts = useToasts();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.settings);
  const {errors, showToastsAndSetErrors, sliceErrors} = useResponseErrors<Settings>();
  const auth = useAuth();
  const response = useQuery({
    queryFn: () => api.getSettings({}),
    queryKey: ['settings'],
    placeholderData: keepPreviousData,
  });
  const onSave = async (settings: SettingsUpdateDto) => {
    const result = await api.updateSettings({body: settings});
    if (showToastsAndSetErrors(result)) {
      return;
    }
    if (!result.data) {
      return;
    }
    auth.login({...user, name: result.data.name, profilePicture: result.data.profilePicture});
    await queryClient.invalidateQueries({queryKey: ['settings']});
    toasts.addSuccess(t(i18n.toasts.success));
    navigate({to: route(RouteId.Settings)});
  };

  return (
    <SettingsUpdatePagePresenter response={response} user={user} onSave={onSave} errors={sliceErrors(errors, (x) => x)} />
  );
};
