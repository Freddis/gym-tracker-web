export interface Filter<TId extends string | number = number> {
  ids?: TId[],
  perPage?: number,
  page?: number,
}
