import {FC, useContext} from 'react';
import {AppLogo} from '../../../../../atoms/AppLogo/AppLogo';
import {useNavigate} from '@tanstack/react-router';
import {useToasts} from '../../../../../atoms/AppToast/hooks/useToasts';
import {AuthContext} from '../../../../AuthProvider/AuthContext';
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
        <CrmSideMenuLink onClick={logout}>Logout</CrmSideMenuLink>
      </div>
    </div>
  );
};
