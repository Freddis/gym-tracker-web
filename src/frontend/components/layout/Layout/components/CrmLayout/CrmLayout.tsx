import {Outlet} from '@tanstack/react-router';
import {FC, useContext} from 'react';
import {AuthContext} from '../../../AuthProvider/AuthContext';
import {CrmSideMenu} from './components/CrmSideMenu';

export const CrmLayout: FC = () => {
  const auth = useContext(AuthContext);
  if (!auth.user) {
    return (
       <Outlet />
    );
  }
  return (
    <>
      <div className="flex flex-col grow">
        <div className="flex items-start">
          <CrmSideMenu/>
          <div className="w-full min-h-screen p-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
