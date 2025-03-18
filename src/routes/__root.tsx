import {createRootRoute} from '@tanstack/react-router';
import {Layout} from '../pages/Layout';
import {NotFoundPage} from '../pages/NotFoundPage';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Gym Tracker',
      },
    ],
  }),
  component: Layout,
  notFoundComponent: NotFoundPage,
});


