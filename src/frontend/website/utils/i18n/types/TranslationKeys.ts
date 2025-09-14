import {TranslationKey} from './TranslationKey';

export type TranslationKeys<T> = {
    [key in keyof T]: T[key] extends string ? TranslationKey : TranslationKeys<T[key]>
}
