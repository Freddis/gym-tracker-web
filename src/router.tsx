import {createRouter as createTanStackRouter} from '@tanstack/react-router';
import {routeTree} from './routeTree.gen';
import {parse, stringify} from 'qs';
import {format, isEqual, startOfDay} from 'date-fns';

// midnight in the user's timezone means the time was never picked, only the day
const isDateOnly = (value: Date) => isEqual(value, startOfDay(value));

export function getRouter() {
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
      // qs serializes dates as full ISO strings, day-only dates deserve a readable form
      const withBeatifulDates: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(searchObj)) {
        const shouldBeautify = value instanceof Date && isDateOnly(value);
        withBeatifulDates[key] = shouldBeautify ? format(value, 'yyyy-MM-dd') : value;
      }
      // correcting urlencoded arrays in query params
      const res = '?' + stringify(withBeatifulDates, {arrayFormat: 'brackets', encodeValuesOnly: true});
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
