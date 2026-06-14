export interface CursorResult<T> {
  items: T[],
  info: {
    nextCursor?: string
  }
}
