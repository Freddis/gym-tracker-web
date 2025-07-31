import {createRouter as createTanStackRouter} from '@tanstack/react-router';
import {routeTree} from './routeTree.gen';
import {parse, stringify} from 'qs';

export function createRouter() {
  const tempRouter = createTanStackRouter({routeTree});
  const router = createTanStackRouter({
    routeTree,
    parseSearch: (searchStr) => {
      // Tanstack can't parse encode arrays and doesn't provide access to route validators here
      const defaultRes = tempRouter.options.parseSearch(searchStr);
      const res = parse(searchStr, {ignoreQueryPrefix: true});
      const combined: Record<string, unknown> = {};
      for (const pair of Object.entries(res)) {
        combined[pair[0]] = defaultRes[pair[0]];
        if (Array.isArray(pair[1])) {
          combined[pair[0]] = pair[1];
        }
      }
      return combined;
    },
    stringifySearch: (searchObj) => {
      if (Object.keys(searchObj).length === 0) {
        return '';
      }
      // correcting urlencoded arrays in query params
      const res = '?' + stringify(searchObj, {arrayFormat: 'brackets', encodeValuesOnly: true});
      if (res === '?') {
        return '';
      }
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
