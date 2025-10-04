import {useNavigate, getRouteApi} from '@tanstack/react-router';
import {FC, useContext} from 'react';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {postAuthPasswordResetComplete, PostAuthPasswordResetCompleteData} from '../../../../../common/utils/openapi-client';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {route, RouteId} from '../../../../../common/utils/route';
import {AuthContext} from '../../../../../common/components/layout/AuthProvider/AuthContext';
import {PaswordResetCompletePagePresenter} from './components/PaswordResetCompletePagePresenter';

const routeApi = getRouteApi('/auth/password-reset-complete/$token');

export const PaswordResetCompletePage: FC = () => {
  const toasts = useToasts();
  const {showToastsAndSetErrors, sliceErrors, errors} = useResponseErrors<PostAuthPasswordResetCompleteData['body']>();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const params = routeApi.useParams();

  const handlePasswordReset = async (data: {password: string, passwordConfirmation: string}) => {
    const result = await postAuthPasswordResetComplete({
      body: {
        token: params.token,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      },
    });

    if (showToastsAndSetErrors(result, {noValidationToasts: true})) {
      return;
    }
    auth.login(result.data);
    toasts.addSuccess('Password has been reset successfully');
    navigate({to: route(RouteId.EntryList)});
  };

  return (
    <PaswordResetCompletePagePresenter
      onReset={handlePasswordReset}
      errors={sliceErrors(errors, (x) => x)}
    />
  );
};
