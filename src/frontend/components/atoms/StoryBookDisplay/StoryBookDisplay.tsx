import {RouterProvider, createRouter, createMemoryHistory, createRootRoute} from '@tanstack/react-router';
import {FC} from 'react';
import {PaletteName} from '../../../../frontend/enums/PaletteName';
import {PartialStoryFn} from 'storybook/internal/types';

export const StoryBookDisplay: FC<{story: PartialStoryFn, noPadding?: boolean, palette?: PaletteName}> = (props) => {
  const pallete = props.palette ?? PaletteName.Neutral;
  const InternalDisplay: FC = () => {
    const paddingClass = props.noPadding ? '' : 'p-10';
    return (
      <div className="flex flex-row h-full w-full">
        <div className={`${paddingClass} theme-light bg-${pallete} text-on-${pallete} w-1/2 flex items-center justify-center`}>
          <props.story />
        </div>
        <div className={`${paddingClass} theme-dark bg-${pallete} text-on-${pallete} w-1/2 flex items-center justify-center`}>
          <props.story />
        </div>
      </div>
    );
  };
  const router = createRouter({
    history: createMemoryHistory(),
    routeTree: createRootRoute({
      component: InternalDisplay,
    }),
  });
  return <RouterProvider router={router} />;
};


