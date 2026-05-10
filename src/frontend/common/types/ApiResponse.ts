import {AppAxiosResponse} from './AppAxiosResponse';

export type ApiResponse<TValue, TError> =
  | { isLoading: true; isError: false; data: AppAxiosResponse<TValue, TError> | undefined }
  | { isLoading: false; isError: true; data: AppAxiosResponse<TValue, TError> | undefined }
  | { isLoading: false; isError: false; data: AppAxiosResponse<TValue, TError> | undefined };
