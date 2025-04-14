
export type NewModel<T> = Omit<T, 'id'> & {id?: undefined}
