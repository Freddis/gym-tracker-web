import {createRootRoute} from '@tanstack/react-router';
import {Layout} from '../frontend/components/layout/Layout/Layout';
import {NotFoundPage} from '../frontend/components/pages/NotFound/NotFoundPage';
import appCss from '../frontend/css/app.css?url';

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
        title: 'Discipline',
      },
    ],
    links: [
      {rel: 'stylesheet', href: appCss},
    ],
  }),
  component: Layout,
  notFoundComponent: NotFoundPage,
});


