import axios, {AxiosInstance} from 'axios';
import {Logger} from '../../utils/Logger/Logger';
import {C0rServiceConfig} from './types/C0rServiceConfig';
import {C0rSearchResponse, C0rSearchResponseSchema} from './types/C0rSearchResponse';
import {C0rBarcodeSearchResponse, C0rBarcodeSearchResponseSchema} from './types/C0rBarcodeSearchResponse';

export class C0rService {
  protected logger: Logger;
  protected httpClient: AxiosInstance;
  protected baseUrl: string = 'https://api.c0r.ai';
  protected config: C0rServiceConfig;

  constructor(config: C0rServiceConfig) {
    this.logger = new Logger(C0rService.name);
    this.httpClient = axios.create();
    this.config = config;
  }

  public async searchFood(query: string): Promise<C0rSearchResponse> {
    const url = `${this.baseUrl}/v1/search/?q=${query}&regions=russia`;
    const response = await this.httpClient.get(url, {
      headers: {
        'X-API-Key': this.config.apiKey,
      },
    });
    const data = C0rSearchResponseSchema.parse(response.data);
    return data;
  }

  public async searchFoodByBarcode(barcode: string): Promise<C0rBarcodeSearchResponse> {
    const url = `${this.baseUrl}/v1/barcode/${barcode}`;
    const response = await this.httpClient.get(url, {
      headers: {
        'X-API-Key': this.config.apiKey,
      },
    });
    const data = C0rBarcodeSearchResponseSchema.parse(response.data);
    return data;
  }
}
