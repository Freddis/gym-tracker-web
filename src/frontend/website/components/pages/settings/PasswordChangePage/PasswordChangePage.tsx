import {FC} from 'react';
import {PasswordChangePagePresenter} from './components/PasswordChangePagePresenter/PasswordChangePagePresenter';
import {useRequiredAuth} from '../../../../../common/components/layout/AuthProvider/utils/useRequiredAuth';
import {api} from '../../../../../common/utils/api';
import {ChangePasswordRequest} from '../../../../../common/utils/openapi-client';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {route, RouteId} from '../../../../../common/utils/route';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {useNavigate} from '@tanstack/react-router';

export const PasswordChangePage: FC = () => {
  const {user} = useRequiredAuth();
  const navigate = useNavigate();
  const {showToastsAndSetErrors, errors, sliceErrors} = useResponseErrors<ChangePasswordRequest>();
  const toasts = useToasts();
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.settings.changePassword);
  const onSave = async (data: ChangePasswordRequest) => {
    const result = await api.changePassword({
      body: data,
    });
    if (showToastsAndSetErrors(result)) {
      return;
    }
    toasts.addSuccess(t(i18n.toasts.success));
    navigate({to: route(RouteId.EntryList)});
  };
  return <PasswordChangePagePresenter user={user} onSave={onSave} errors={sliceErrors(errors, (x) => x)} />;
};

