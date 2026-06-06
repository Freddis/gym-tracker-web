import axios, {AxiosInstance} from 'axios';
import {Logger} from '../../utils/Logger/Logger';
import {ProductSearchResponse, productSearchResponseValidator} from './types/ProductSearchResponse';

interface FoodResponse {
  id: number;
  name: string;
  brand: string | null;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  servingSize: number | null;
}

export class OpenFoodFactsService {
  protected logger: Logger;
  protected httpClient: AxiosInstance;
  protected baseUrl: string = 'https://world.openfoodfacts.org/api';

  constructor() {
    this.logger = new Logger(OpenFoodFactsService.name);
    this.httpClient = axios.create();
  }

  async searchFoodByBarcode(barcode: number): Promise<FoodResponse | null> {
    const response = await this.productSearch(barcode);
    if (!response) {
      return null;
    }
    const food: FoodResponse = {
      id: barcode,
      name: response.product.product_name,
      brand: response.product.brands,
      calories: response.product.nutrition.aggregated_set.nutrients['energy-kcal']?.value ?? null,
      protein: response.product.nutrition.aggregated_set.nutrients.proteins?.value ?? null,
      carbs: response.product.nutrition.aggregated_set.nutrients.carbohydrates?.value ?? null,
      fat: response.product.nutrition.aggregated_set.nutrients.fat?.value ?? null,
      servingSize: response.product.serving_quantity ?? null,
    };
    return food;
  }

  protected async productSearch(barcode: number): Promise<ProductSearchResponse | null> {
    const url = this.getApiUrl(`/v3.6/product/${barcode}`);
    const response = await this.httpClient.request({
      url,
      headers: {Authorization: 'Basic ' + btoa('off:off')},
      method: 'GET',
    });
    if (response.status === 404) {
      return null;
    }
    const data = productSearchResponseValidator.parse(response.data);
    return data;
  }

  protected getApiUrl(path: `/${string}`): string {
    return `${this.baseUrl}${path}`;
  }
}
