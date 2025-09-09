import {PageContainer} from '../../layout/PageContainer/PageContainer';
import {AppBlock} from '../../atoms/AppBlock/AppBlock';
import {FC} from 'react';

export const NotFoundPage: FC = () => {

  return (
    <PageContainer className="justify-center">
      <AppBlock className="max-w-2xl min-h-100 max-h-full flex items-center">
        <div className="flex flex-col items-center md:flex-row md:items-stretch gap-10">
          <div className="text-5xl md:border-r-1 border-on-surface/50 md:px-10 flex flex-row items-center">
            <h2 className="font-semibold">404</h2>
          </div>
          <div className="flex items-center">
            <div className="text-center md:text-left">
              <h1 className="text-xl mb-5 font-normal">Page not found</h1>
              <p>This page doesn't exist. If that's a mistake, please let us know and we'll fix it.</p>
            </div>
          </div>
        </div>
      </AppBlock>
    </PageContainer>
  );
};
