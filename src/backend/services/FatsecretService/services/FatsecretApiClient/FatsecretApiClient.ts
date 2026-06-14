import axios, {AxiosInstance, RawAxiosRequestHeaders} from 'axios';
import {Logger} from '../../../../utils/Logger/Logger';
import {FatsecretService} from '../../FatsecretService';
import {RedisService} from '../../../RedisService/RedisService';
import {FatsecretApiHeaders} from './types/FatsecretApiHeaders';
import {FatsecretAuthRequest} from './types/FatsecretAuthRequest';
import {FatsecretAuthRequestHeaders} from './types/FatsecretAuthRequestHeaders';
import {FatsecretAuthResponse, FatsecretAuthResponseSchema} from './types/FatsecretAuthResponse';
import {FatsecretBarcodeScanRequest} from './types/FatsecretBarcodeScanRequest';
import {FatsecretBarcodeScanResponse, FatsecretBarcodeScanResponseSchema} from './types/FatsecretBarcodeScanResponseSchema';
import {FatsecretFoodSearchRequest} from './types/FatsecretFoodSearchRequest';
import {FatsecretFoodSearchResponse, FatsecretFoodSearchResponseSchema} from './types/FatsecretFoodSearchResponse';
import {FatsecretApiClientConfig} from './types/FatsecretApiClientConfig';

export class FatsecretApiClient {
  protected config: FatsecretApiClientConfig;
  protected logger: Logger;
  protected redisKeyAuth = 'fatsecret_auth';
  protected authTttlSeconds = 60 * 60 * 24 * 5;
  protected baseUrl = 'https://app.ftscrt.com/api';
  protected httpClient: AxiosInstance;
  protected redisService: RedisService;

  constructor(config: FatsecretApiClientConfig, redisService: RedisService) {
    this.logger = new Logger(FatsecretService.name);
    this.config = config;
    this.httpClient = axios.create();
    this.redisService = redisService;
  }

  async searchFood(body: FatsecretFoodSearchRequest): Promise<FatsecretFoodSearchResponse> {
    const auth = await this.getAuth();
    const url = this.getApiUrl('/food/v1/search');
    const headers = this.getApiHeaders(auth);
    const response = await this.httpClient.request({
      url,
      headers,
      method: 'POST',
      data: body,
    });
    this.logger.info('Food search response', {response: response.data});
    const result = FatsecretFoodSearchResponseSchema.parse(response.data);
    return result;
  }

  async bardcodeScan(body: FatsecretBarcodeScanRequest): Promise<FatsecretBarcodeScanResponse | null> {
    const auth = await this.getAuth();
    const url = this.getApiUrl('/barcode-verification/v1/scan');
    const headers = this.getApiHeaders(auth);
    const response = await this.httpClient.request({
      url,
      headers,
      method: 'POST',
      data: body,
    });
    this.logger.info('Barcode scan response', {response: response.data});
    const result = FatsecretBarcodeScanResponseSchema.parse(response.data);
    return result;
  }

  protected async getAuth(): Promise<FatsecretAuthResponse> {
    const token = await this.redisService.getValidatedObject(this.redisKeyAuth, FatsecretAuthResponseSchema);
    if (token) {
      this.logger.info('Auth found in redis', {auth: token});
      return token;
    }
    this.logger.info('Auth not found in redis, authenticating');
    const auth = await this.authenticate();
    await this.redisService.setObject(this.redisKeyAuth, auth, this.authTttlSeconds);
    return auth;
  }

  protected async authenticate(): Promise<FatsecretAuthResponse> {
    try {
      const url = this.getApiUrl('/authenticate/v1/fatsecret');
      const body: FatsecretAuthRequest = {
        deviceIdentifier: this.config.deviceIdentifier,
        userName: this.config.userName,
        password: this.config.password,
      };
      const headers = this.getApiAuthHeaders();
      const response = await this.httpClient.request({
        url,
        headers,
        method: 'POST',
        data: body,
      });
      const result = FatsecretAuthResponseSchema.parse(response.data);
      return result;
    } catch (error: unknown) {
      this.logger.error('Failed to authenticate', error);
      throw new Error('Failed to authenticate');
    }
  }

  protected getApiUrl(path: `/${string}`): string {
    return `${this.baseUrl}${path}`;
  }

  protected getApiHeaders(auth: FatsecretAuthResponse): RawAxiosRequestHeaders {
    // making it as authentic as possible
    const base = this.getApiAuthHeaders();
    const result: FatsecretApiHeaders = {
      ...base,
      c_d: auth.deviceKey,
      c_id: auth.serverId.toString(),
      c_fl: '2',
      c_s: auth.secretKey,
      Authorization: 'FatSecret',
    };
    return {...base, ...result};

  }
  protected getApiAuthHeaders(): FatsecretAuthRequestHeaders {
    const headers: FatsecretAuthRequestHeaders = {
      'Host': 'app.ftscrt.com',
      'dt': '20609',
      'fs_device_type': 'ios',
      'timestamp': this.createTimeStamp(),
      'Accept': '*/*',
      'Accept-Language': 'en-GB,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Type': 'application/json',
      'debug': 'false',
      'User-Agent': 'fatsecret/20 CFNetwork/3860.600.12 Darwin/25.5.0',
      'c_desc': 'iPhone',
      'Connection': 'keep-alive',
      'fs_market_locale': 'RU',
      'fs_app_version': '11.5',
      'fs_language_locale': 'en',
    };
    return headers;
  }
  protected createTimeStamp(): string {
    const epochMs = Date.now();
    // we need mictoseconds from performance, but performance counting from app start, so we need date as as well
    const perfFractionMs = performance.now() % 1;
    const seconds = epochMs / 1000 + perfFractionMs / 1000;
    return seconds.toFixed(7);
  }
 }
