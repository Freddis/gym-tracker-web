import {RouterProvider, createRouter, createMemoryHistory, createRootRoute} from '@tanstack/react-router';
import {FC} from 'react';
import {PaletteName} from '../../../../frontend/enums/PaletteName';
import {PartialStoryFn} from 'storybook/internal/types';
import {twMerge} from 'tailwind-merge';
export interface StoryBookDisplayProps {
  story: PartialStoryFn,
  className?: string,
  palette?: PaletteName,
  column?:boolean
}
export const StoryBookDisplay: FC<StoryBookDisplayProps> = (props) => {
  const pallete = props.palette ?? PaletteName.Neutral;
  const flexDiraction = props.column ? 'flex-col' : 'flex-row';
  const InternalDisplay: FC = () => {
    const baseClasses = `p-10 bg-${pallete} text-on-${pallete} flex items-center justify-center`;
    return (
      <div className={`flex ${flexDiraction} h-full w-full justify-center`}>
        <div className={twMerge(baseClasses, 'theme-light', props.className)}>
          <props.story />
        </div>
        <div className={twMerge(baseClasses, 'theme-dark', props.className)}>
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


