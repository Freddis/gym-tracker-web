import {FC, useContext} from 'react';
import {useNavigate} from '@tanstack/react-router';
import {AppLogo} from '../../../../../common/components/atoms/AppLogo/AppLogo';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {AuthContext} from '../../../../../common/components/layout/AuthProvider/AuthContext';
import {CrmSideMenuLink} from './components/CrmSideMenuLink';

export const CrmSideMenu: FC = () => {
  const auth = useContext(AuthContext);
  const toasts = useToasts();
  const navigate = useNavigate();
  const logout = () => {
    auth.logout();
    toasts.addSuccess("You've been successfully logged out");
    navigate({
      to: '/crm',
    });
  };
  return (
    <div className="palette-darkest bg-main text-on-main min-h-screen h-full p-10">
      <AppLogo className="mb-10" />
      <div className="flex flex-col gap-5">
        <CrmSideMenuLink to={'/crm/users'}>Users</CrmSideMenuLink>
        <CrmSideMenuLink to={'/crm/managers'}>Managers</CrmSideMenuLink>
        <CrmSideMenuLink to={'/'} onClick={logout}>Logout</CrmSideMenuLink>
      </div>
    </div>
  );
};
