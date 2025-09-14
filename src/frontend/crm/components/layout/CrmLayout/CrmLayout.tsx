import {Outlet} from '@tanstack/react-router';
import {FC, useContext} from 'react';
import {CrmSideMenu} from './components/CrmSideMenu';
import {AuthContext} from '../../../../common/components/layout/AuthProvider/AuthContext';
import {Language} from '../../../../common/components/layout/LanguageProvider/enums/Language';
import {LanguageProvider} from '../../../../common/components/layout/LanguageProvider/LanguageProvider';

export const CrmLayout: FC = () => {
  const auth = useContext(AuthContext);
  if (!auth.user) {
    return <Outlet />;
  }
  return (
    <>
      <LanguageProvider language={Language.English}>
        <div className="flex flex-col grow">
          <div className="flex items-stretch">
            <CrmSideMenu />
            <div className="w-full min-h-screen p-10">
              <Outlet />
            </div>
          </div>
        </div>
      </LanguageProvider>
    </>
  );
};
