import {Logger} from '../../utils/Logger/Logger';
import axios, {AxiosInstance} from 'axios';
import * as cheerio from 'cheerio';
import {FatsecretFoodResponse} from './types/FatsecretFoodResponse';
import {PaginatedResult} from '../ApiService/types/PaginatedResult';
import {FatsecretApiClient} from './services/FatsecretApiClient/FatsecretApiClient';
import {Interface} from '../../types/Interface';

export class FatsecretService {
  protected logger: Logger;
  protected apiClient: Interface<FatsecretApiClient>;
  protected httpClient: AxiosInstance;

  constructor(apiClient: Interface<FatsecretApiClient>) {
    this.logger = new Logger(FatsecretService.name);
    this.apiClient = apiClient;
    this.httpClient = axios.create();
  }

  async getFoodByBarcode(barcode: number): Promise<FatsecretFoodResponse | null> {
    this.logger.info('Searching food by barcode', {barcode});
    const response = await this.apiClient.bardcodeScan({
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

  async getFoodByQuery(params: {query: string, page?: number}): Promise<PaginatedResult<FatsecretFoodResponse>> {
    const page = params.page ?? 1;
    const response = await this.apiClient.searchFood({
      PageNumber: page - 1,
      PageSize: 20,
      SearchExpression: params.query,
    });
    const food = response.recipes.map((recipe) => {
      const url = decodeURIComponent(recipe.pathName);
      const parts = url.split('/').reverse();
      const brand = parts[2] ?? null;
      const servingSizeMatch = recipe.defaultPortionDescription.match(/(\s*\d+(?:\.\d+)?)\s*(g|г)\s*/i);
      let servingSizeGrams = servingSizeMatch && servingSizeMatch[1] ? parseFloat(servingSizeMatch[1]) : null;
      if (servingSizeGrams === null && recipe.gramsPerPortion !== 0) {
        servingSizeGrams = recipe.gramsPerPortion;
      }
      const multiplier = 100 / (servingSizeGrams ?? 100);
      console.log({
        servingSizeGrams,
        multiplier,
      });
      const obj: FatsecretFoodResponse = {
        id: recipe.id,
        name: recipe.title,
        brand: brand,
        calories: Math.round(recipe.energyPerPortion * multiplier * 100) / 100,
        protein: Math.round(recipe.proteinPerPortion * multiplier * 100) / 100,
        carbs: Math.round(recipe.carbohydratePerPortion * multiplier * 100) / 100,
        fat: Math.round(recipe.fatPerPortion * multiplier * 100) / 100,
        servingSize: servingSizeGrams !== 100 ? servingSizeGrams : null,
      };
      return obj;
    });
    return {
      items: food,
      info: {
        page,
        count: response.totalresults,
        pageSize: 20,
      },
    };
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

}
