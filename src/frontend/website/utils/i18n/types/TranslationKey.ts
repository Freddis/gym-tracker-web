// this is branded types, which would prevent using constants in the interface
declare const __brand: unique symbol;
type Brand<B> = { [__brand]: B }
type Branded<T, B> = T & Brand<B>

export type TranslationKey = Branded<string, 'translation'>
