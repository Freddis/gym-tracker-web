export interface PaginatedResult<T> {
  items: T[],
  info: {
    page: number
    count: number
    pageSize: number
  }
}
