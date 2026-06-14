import {RawAxiosRequestHeaders} from 'axios';

// POST /api/authenticate/v1/fatsecret HTTP/1.1
// Host: app.ftscrt.com
// dt: 20609
// fs_device_type: ios
// timestamp: 1770665854.7761211
// Accept: */*
// Accept-Language: en-GB,en;q=0.9
// Accept-Encoding: gzip, deflate, br
// Content-Type: application/json
// debug: false
// Content-Length: 133
// User-Agent: fatsecret/20 CFNetwork/3860.600.12 Darwin/25.5.0
// fs-token: eyJraWQiOiJrMnhhbUEidQiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxOjEx
// c_desc: iPhone
// Connection: keep-alive
// fs_market_locale: RU
// fs_app_version: 11.5
// fs_language_locale: en
// {
//   "deviceIdentifier" : "63BBBB97-94CC-4B6F-AA10-7CF4F1DB181D",
//   "userName" : "someting@gmail.com",
//   "password" : "#"
// }
export interface FatsecretAuthRequestHeaders extends RawAxiosRequestHeaders {
  'Host': string;
  'dt': string;
  'fs_device_type': string;
  'timestamp': string;
  'Accept': string;
  'Accept-Language': string;
  'Accept-Encoding': string;
  'Content-Type': string;
  'debug': string;
  // 'Content-Length': string;
  'User-Agent': string;
  /**
   * Firebase token
   */
  'fs-token'?: string;
  'c_desc': string;
  'Connection': string;
  'fs_market_locale': string;
  'fs_app_version': string;
  'fs_language_locale': string;
}
