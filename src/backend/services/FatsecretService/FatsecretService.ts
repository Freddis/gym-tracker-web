import {Logger} from '../../utils/Logger/Logger';
import axios, {AxiosInstance, RawAxiosRequestHeaders} from 'axios';
import {FatsecretServiceConfig} from './types/FatsecretServiceConfig';
import {RedisService} from '../RedisService/RedisService';
import * as cheerio from 'cheerio';
import {FatsecretApiHeaders} from './types/FatsecretApiHeaders';
import {FatsecretFoodResponse} from './types/FatsecretFoodResponse';
import {FatsecretBarcodeScanResponse, FatsecretBarcodeScanResponseSchema} from './types/FatsecretBarcodeScanResponseSchema';
import {FatsecretBarcodeScanRequest} from './types/FatsecretBarcodeScanRequest';
import {FatsecretAuthResponse, FatsecretAuthResponseSchema} from './types/FatsecretAuthResponse';
import {FatsecretAuthRequest} from './types/FatsecretAuthRequest';
import {FatsecretAuthRequestHeaders} from './types/FatsecretAuthRequestHeaders';
import {FatsecretFoodSearchRequest} from './types/FatsecretFoodSearchRequest';
import {FatsecretFoodSearchResponse, FatsecretFoodSearchResponseSchema} from './types/FatsecretFoodSearchResponse';

export class FatsecretService {
  protected config: FatsecretServiceConfig;
  protected logger: Logger;
  protected redisKeyAuth = 'fatsecret_auth';
  protected authTttlSeconds = 60 * 60 * 24 * 5;
  protected baseUrl = 'https://app.ftscrt.com/api';
  protected httpClient: AxiosInstance;
  protected redisService: RedisService;


  constructor(config: FatsecretServiceConfig, redisService: RedisService) {
    this.logger = new Logger(FatsecretService.name);
    this.config = config;
    this.httpClient = axios.create();
    this.redisService = redisService;
  }

  async searchFoodByBarcode(barcode: number): Promise<FatsecretFoodResponse | null> {
    this.logger.info('Searching food by barcode', {barcode});
    const response = await this.bardcodeScan({
      deviceCanPrompt: false,
      barcode: barcode.toString(),
    });
    const foodId = response?.foodId;
    if (!foodId) {
      return null;
    }
    const food = await this.getFood(foodId);
    return food;
  }

  async getFood(foodId: number): Promise<FatsecretFoodResponse> {
    const page = await this.getFoodPage(foodId);
    const $ = cheerio.load(page);
    // Brand (e.g. "Три Корочки")
    const brand = $('h2.manufacturer').first().text().trim();
    // Product name (from h1 link)
    const name = $('h1 a').first().text().trim();
    // Nutrition facts are in .factValue blocks
    const facts: Record<string, number> = {};
    $('.factPanel .fact').each((_, el) => {
      const key = $(el).find('.factTitle').text().trim().toLowerCase();
      const valueText = $(el).find('.factValue').text().trim();
      // remove non-numeric characters (e.g. "10g" -> 10)
      const value = parseFloat(valueText.replace(/[^\d.]/g, ''));
      if (!Number.isNaN(value)) {
        facts[key] = value;
      }
    });
    const servingMatch = page.match(/\((\s*\d+(?:\.\d+)?)\s*(g|г)\s*\)/i);
    const servingSizeGrams = servingMatch && servingMatch[1] ? parseFloat(servingMatch[1]) : null;
    const multiplier = 100 / (servingSizeGrams ?? 100);
    const food: FatsecretFoodResponse = {
      id: foodId,
      name,
      brand,
      calories: (facts.calories ?? 0) * multiplier,
      fat: (facts.fat ?? 0) * multiplier,
      carbs: (facts.carbs ?? 0) * multiplier,
      protein: (facts.protein ?? 0) * multiplier,
      servingSize: servingSizeGrams !== 100 ? servingSizeGrams : null,
    };
    return food;
  }

  async getFoodPage(foodId: number): Promise<string> {
    const url = `https://foods.fatsecret.com/Diary.aspx?pa=fjrd&rid=${foodId}`;
    const response = await this.httpClient.get(url);
    if (response.status !== 200) {
      throw new Error(`Failed to get food page for id ${foodId}`);
    }
    return response.data;
  }

  async searchFood(body: FatsecretFoodSearchRequest): Promise<FatsecretFoodSearchResponse | null> {
    const auth = await this.getAuth();
    const url = this.getApiUrl('/food/v1/search');
    const headers = this.getApiHeaders(auth);
    const response = await this.httpClient.request({
      url,
      headers,
      method: 'POST',
      data: body,
    });
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
