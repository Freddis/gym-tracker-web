import {createRootRoute} from '@tanstack/react-router';
import {Layout} from '../components/layout/Layout/Layout';
import {NotFoundPage} from '../components/pages/NotFound/NotFoundPage';

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


