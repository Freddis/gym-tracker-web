type AxiosResponse<TValue, TError> = { data: TValue | undefined; error: TError | undefined } | undefined;

export type ApiResponse<TValue, TError> =
  | { isLoading: true; isError: false; data: AxiosResponse<TValue, TError> }
  | { isLoading: false; isError: true; data: AxiosResponse<TValue, TError> }
  | { isLoading: false; isError: false; data: AxiosResponse<TValue, TError> };
