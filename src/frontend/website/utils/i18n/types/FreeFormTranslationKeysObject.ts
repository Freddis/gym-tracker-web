import {TranslationKey} from './TranslationKey';

export type FreeFormTranslationKeysObject = {
    [key: string]: TranslationKey | FreeFormTranslationKeysObject
}
