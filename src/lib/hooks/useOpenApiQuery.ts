import {TDataShape} from '@hey-api/client-axios';
import {keepPreviousData, QueryKey, useQuery, UseQueryOptions, UseQueryResult, DefaultError} from '@tanstack/react-query';
import {Options} from '../data/client/api/sdk.gen';

export function useOpenApiQuery<
TDShape extends TDataShape,
TQueryFnData = unknown,
TError = DefaultError,
TData = TQueryFnData,
TQueryKey extends QueryKey = QueryKey
 >(
  queryOptionsFunc: (options?: Options<TDShape>) => UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  options?: Options<TDShape>,
): UseQueryResult<TData, TError> {
  const opts = queryOptionsFunc(options);
    // place to add some global overrides for queries
  opts.placeholderData = keepPreviousData;
  const result = useQuery(opts);
  return result;
}
