import {Outlet} from '@tanstack/react-router';
import {FC} from 'react';
import {Header} from '../Header/Header';
import {Footer} from '../Footer/Footer';

export const WebsiteLayout: FC = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col grow">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
