import type {FileRoutesByTo} from '../../../routeTree.gen';
import {Prettify} from '../../../common/types/Prettify';

export enum RouteId {
  Home,
  Argus,
  Feed,
  ExerciseLibrary,
  EntryList,
  Exercise,
  TermsOfService,
  PrivacyPolicy,
  ExerciseCreate,
  WeightCreate,
  Login,
  Register,
  EntryAdd,
  WorkoutCreate,
  Crm,
  CrmUsers,
  CrmManagers,
  ExerciseUpdate,
  WorkoutTypeList,
  WorkoutTypeUpdate,
  WeightUpdate,
  WorkoutUpdate,
  WorkoutTypeCreate,
  WorkoutPlanList,
  WorkoutPlanCreate,
  WorkoutPlanUpdate,
}

type Inverted<T extends Record<string | number, string | number>> = {
  [K in keyof T as T[K]]: K
};
const swapKeysAndValues = <T extends Record<string | number, string | number>>(obj: T):Inverted<T> => {
  const swappedObject = Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [value, key])
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return swappedObject as any;
};

/**
 * Helper to avoid using Satisfies. Needed to enable VSCode autocomplete.
 */
const createRouteMap = <T extends Record< keyof FileRoutesByTo, RouteId>>(map: T): T => {
  const containsDuplicateValues = Object.values(map).length !== Array.from(new Set(Object.values(map))).length;
  if (containsDuplicateValues) {
    throw new Error('Detected duplicates in the route map');
  }
  return map;
};

const baseRouteMap = createRouteMap({
  '/': RouteId.Home,
  '/articles/privacy-policy': RouteId.PrivacyPolicy,
  '/articles/terms-of-service': RouteId.TermsOfService,
  '/auth/login': RouteId.Login,
  '/auth/register': RouteId.Register,
  '/argus': RouteId.Argus,
  '/feed': RouteId.Feed,
  '/entries': RouteId.EntryList,
  '/entries/add': RouteId.EntryAdd,
  '/exercises': RouteId.ExerciseLibrary,
  '/exercises/$exerciseId': RouteId.Exercise,
  '/exercises/create': RouteId.ExerciseCreate,
  '/exercises/update/$exerciseId': RouteId.ExerciseUpdate,
  '/weight/create': RouteId.WeightCreate,
  '/weight/update/$id': RouteId.WeightUpdate,
  '/workouts/create': RouteId.WorkoutCreate,
  '/workouts/update/$id': RouteId.WorkoutUpdate,
  '/workouts/plans': RouteId.WorkoutPlanList,
  '/workouts/plans/create': RouteId.WorkoutPlanCreate,
  '/workouts/plans/update/$id': RouteId.WorkoutPlanUpdate,
  '/workouts/types': RouteId.WorkoutTypeList,
  '/workouts/types/create': RouteId.WorkoutTypeCreate,
  '/workouts/types/update/$id': RouteId.WorkoutTypeUpdate,
  '/crm': RouteId.Crm,
  '/crm/managers': RouteId.CrmManagers,
  '/crm/users': RouteId.CrmUsers,
});

type NonUniqueKeys<T> = {
    [K in keyof T]: {
        [P in keyof T]: P extends K ? never : T[P] extends T[K] ? K : never
    }[keyof T] extends never
        ? T[K]
        : never
};

// This is compile time check for duplicate values,
// it's important to avoid it since unionized routes break TanStacks's type inference
const checkedRouteMap: Prettify<NonUniqueKeys<typeof baseRouteMap>> = baseRouteMap;
const routeIdMap: Prettify<Inverted<typeof checkedRouteMap>> = swapKeysAndValues(checkedRouteMap);

/**
 * Returns the path string for a given RouteId.
 *
 * This centralizes route paths, allowing you to:
 *  1. Move routes around more freely without breaking links.
 *  2. Preserve code-splitting and lazy-loading behavior.
 *  3. Refactor route paths easily — changing the path in one place updates all usages.
 *
 * Example:
 *   route(RouteId.Exercise) // returns "/exercises/$exerciseId"
 */
export const route = <T extends RouteId>(id: T): typeof routeIdMap[T] => {
  return routeIdMap[id];
};
