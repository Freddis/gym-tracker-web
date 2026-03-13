export type NestedDefinite<T> = {
  [P in keyof T]: T[P] extends object ? NestedDefinite<T[P]> : Exclude<T[P], undefined>;
};
