// This file is auto-generated by @hey-api/openapi-ts

import {type Options, getEntries} from '../sdk.gen';
import {queryOptions} from '@tanstack/react-query';
import type {GetEntriesData} from '../types.gen';
import {client as _heyApiClient} from '../client.gen';

export type QueryKey<TOptions extends Options> = [
  Pick<TOptions, 'baseURL' | 'body' | 'headers' | 'path' | 'query'> & {
    _id: string
    _infinite?: boolean
  },
]

const createQueryKey = <TOptions extends Options>(
  id: string,
  options?: TOptions,
  infinite?: boolean,
): [QueryKey<TOptions>[0]] => {
  const params: QueryKey<TOptions>[0] = {
    _id: id,
    baseURL: (options?.client ?? _heyApiClient).getConfig().baseURL,
  } as QueryKey<TOptions>[0];
  if (infinite) {
    params._infinite = infinite;
  }
  if (options?.body) {
    params.body = options.body;
  }
  if (options?.headers) {
    params.headers = options.headers;
  }
  if (options?.path) {
    params.path = options.path;
  }
  if (options?.query) {
    params.query = options.query;
  }
  return [params];
};

export const getEntriesQueryKey = (options?: Options<GetEntriesData>) =>
  createQueryKey('getEntries', options);

export const getEntriesOptions = (options?: Options<GetEntriesData>) => {
  return queryOptions({
    queryFn: async ({queryKey, signal}) => {
      const {data} = await getEntries({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: getEntriesQueryKey(options),
  });
};
