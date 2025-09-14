/**
 * Magically makes TS types cleaner by resolving fields to narrowed types
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
