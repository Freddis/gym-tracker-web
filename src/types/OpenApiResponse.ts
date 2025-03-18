
type SwapTypes<T, From, To> = {
  [key in keyof T]: T[key] extends From ? To : T[key]
}

export type OpenApiResponse<T> = SwapTypes<SwapTypes<T, Date, string>, Date|null, string|null>
