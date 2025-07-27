import {createRouter as createTanStackRouter} from '@tanstack/react-router';
import {routeTree} from './routeTree.gen';
import {parse, stringify} from 'qs';

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    parseSearch: (searchStr) => {
      const res = parse(searchStr, {ignoreQueryPrefix: true});
      return res;
    },
    stringifySearch: (searchObj) => {
      if (Object.keys(searchObj).length === 0) {
        return '';
      }
      // correcting urlencoded arrays in query params
      const res = '?' + stringify(searchObj, {arrayFormat: 'brackets', encodeValuesOnly: true});
      return res;
    },
    defaultPreload: 'intent',
    scrollRestoration: true,
  });

  return router;
}
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
