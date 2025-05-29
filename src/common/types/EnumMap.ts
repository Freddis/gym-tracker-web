export type EnumMap<TEnum extends string | undefined, Tval> = {
  [key in Exclude<TEnum, undefined>]: Tval
}
