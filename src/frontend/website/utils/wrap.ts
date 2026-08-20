export interface Wrapped<T>{
  item: T;
  key: string;
}
export const wrap = <T>(item: T): Wrapped<T> => {
  return {
    item,
    key: crypto.randomUUID(),
  };
};
