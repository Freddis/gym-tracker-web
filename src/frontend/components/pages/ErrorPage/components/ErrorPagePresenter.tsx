import {ErrorComponentProps} from '@tanstack/react-router';
import {FC} from 'react';
import {AppLink} from '../../../atoms/AppLink/AppLink';
import {AppLogo} from '../../../atoms/AppLogo/AppLogo';
import {AppBlock} from '../../../atoms/AppBlock/AppBlock';
import {PageContainer} from '../../../layout/PageContainer/PageContainer';

export const ErrorPagePresenter: FC<ErrorComponentProps> = (props) => {
  // todo: delete this before release
  console.log(props.error);
  return (
    <div className="palette-neutral bg-main text-on-main ">
      <PageContainer className="justify-center min-h-screen">
        <AppBlock className="max-w-2xl min-h-100 max-h-full flex flex-col items-center">
          <div className="flex flex-col items-center">
            <AppLink to="/">
              <AppLogo withText className="my-15"/>
            </AppLink>
            <div className="flex flex-col items-center md:flex-row md:items-stretch gap-10">
              <div className="flex items-center">
                <div className="text-center md:text-left">
                  <h1 className="text-xl mb-5 font-normal">Oops! Unknown Error!</h1>
                  <p>Something terrible happened and we don't know what.
                    Please let us know and we'll fix it. Thank you for your patience.</p>
                    <AppLink to="/" className="inline-block mt-5">Back To Home Page</AppLink>
                </div>
              </div>
            </div>
          </div>
        </AppBlock>
      </PageContainer>
    </div>
  );
};
