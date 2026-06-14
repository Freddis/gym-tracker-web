import {FatsecretAuthRequestHeaders} from './FatsecretAuthRequestHeaders';

export interface FatsecretApiHeaders extends FatsecretAuthRequestHeaders {
  'c_d': string;
  'c_id': string;
  'c_fl': string;
  'c_s': string;
  'Authorization': string;
 }
