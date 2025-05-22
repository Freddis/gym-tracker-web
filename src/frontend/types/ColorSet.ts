import {Color} from '../enums/Color';

export type ColorSet = {
  [key in Color]: string;
}
