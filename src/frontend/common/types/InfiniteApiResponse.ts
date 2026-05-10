import {AppAxiosResponse} from './AppAxiosResponse';

export interface InfiniteApiResponse<TValue, TError> {
  isLoading: boolean;
  isError: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  data: {
    pages: AppAxiosResponse<TValue, TError>[];
  } | undefined;
}
