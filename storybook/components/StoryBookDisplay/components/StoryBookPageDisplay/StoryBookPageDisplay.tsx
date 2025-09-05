import {FC, ReactNode} from 'react';
import {Footer} from '../../../../../src/frontend/components/layout/Footer/Footer';
import {Header} from '../../../../../src/frontend/components/layout/Header/Header';

export const StoryBookPageDisplay: FC<{story: ReactNode}> = (props) => {
  return (
    <div className="flex min-h-screen flex-col font-extralight palette-neutral bg-main">
      <Header/>
        <div className="flex flex-col grow">
          {props.story}
        </div>
      <Footer />
    </div>
  );
};
