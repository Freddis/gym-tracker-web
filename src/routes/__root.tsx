import {createRootRoute} from '@tanstack/react-router';
import {Layout} from '../frontend/common/components/layout/Layout/Layout';
import {NotFoundPage} from '../frontend/website/components/pages/NotFound/NotFoundPage';
import appCss from '../frontend/common/utils/css/app.css?url';
import {ErrorPage} from '../frontend/website/components/pages/ErrorPage/ErrorPage';

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
  errorComponent: ErrorPage,
});


