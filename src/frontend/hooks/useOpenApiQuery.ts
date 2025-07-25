import {TDataShape} from '@hey-api/client-axios';
import {keepPreviousData, QueryKey, useQuery, UseQueryOptions, UseQueryResult, DefaultError} from '@tanstack/react-query';
import {Options} from '../openapi-client/sdk.gen';

export function useOpenApiQuery<
TDShape extends TDataShape,
TQueryFnData = unknown,
TError = DefaultError,
TData = TQueryFnData,
TQueryKey extends QueryKey = readonly unknown[]
 >(
  queryOptionsFunc: (options?: Options<TDShape>) => UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  options: Options<TDShape> & {queryKey?: TQueryKey},
): UseQueryResult<TData, TError> {
  const opts = queryOptionsFunc(options);
    // place to add some global overrides for queries
  opts.placeholderData = keepPreviousData;
  if (options?.queryKey) {
    opts.queryKey = options.queryKey;
  }
  opts.retry = 0;
  const result = useQuery(opts);
  return result;
}
