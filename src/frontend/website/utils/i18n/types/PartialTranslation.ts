import {Translation} from './Translation';

type RecursivePartial<T> = {
    [key in keyof T]?: RecursivePartial<T[key]>
}

export type PartialTranslation = RecursivePartial<Translation>
