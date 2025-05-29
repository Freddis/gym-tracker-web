import {FC, ReactNode} from 'react';
import {Footer} from '../../../../../src/frontend/components/layout/Footer/Footer';
import {Header} from '../../../../../src/frontend/components/layout/Header/Header';

export const StoryBookPageDisplay: FC<{story: ReactNode}> = (props) => {
  return (
    <div className="flex flex-col bg-neutral">
      <Header/>
        <div className="grow">
          {props.story}
        </div>
      <Footer />
    </div>
  );
};
