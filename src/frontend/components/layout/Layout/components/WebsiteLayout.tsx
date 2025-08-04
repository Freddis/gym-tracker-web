import {Outlet} from '@tanstack/react-router';
import {FC} from 'react';
import {Footer} from '../../Footer/Footer';
import {Header} from '../../Header/Header';

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
