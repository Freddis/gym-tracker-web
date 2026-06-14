import {Logger} from '../../../../utils/Logger/Logger';
import {FatsecretApiClient} from '../FatsecretApiClient/FatsecretApiClient';
import {DrizzleService} from '../../../DrizzleService/DrizzleService';
import {FatsecretBarcodeScanRequest} from '../FatsecretApiClient/types/FatsecretBarcodeScanRequest';
import {FatsecretBarcodeScanResponse} from '../FatsecretApiClient/types/FatsecretBarcodeScanResponseSchema';
import {FatsecretFoodSearchRequest} from '../FatsecretApiClient/types/FatsecretFoodSearchRequest';
import {FatsecretFoodSearchResponse} from '../FatsecretApiClient/types/FatsecretFoodSearchResponse';
import {Interface} from '../../../../types/Interface';
import {FatsecretRecipe} from '../FatsecretApiClient/types/FatsecretRecipe';

/**
 * Service that caches the FatsecretService responses in the database, so we don't load their servers too much and able to re-process data.
 */
export class CachingFatsecretApiClient implements Interface<FatsecretApiClient> {
  protected fatsecretApiClient: FatsecretApiClient;
  protected logger = new Logger(FatsecretApiClient.name);
  protected drizzleService: DrizzleService;

  constructor(fatsecretApiClient: FatsecretApiClient, drizzleService: DrizzleService) {
    this.fatsecretApiClient = fatsecretApiClient;
    this.drizzleService = drizzleService;
  }

  async searchFood(body: FatsecretFoodSearchRequest): Promise<FatsecretFoodSearchResponse> {
    const existing = await this.getExistingFoodResponseByQuery(body);
    if (existing) {
      return existing;
    }
    const response = await this.fatsecretApiClient.searchFood(body);
    await this.saveFoodResponseByQuery(body, response);
    return response;
  }

  async bardcodeScan(body: FatsecretBarcodeScanRequest): Promise<FatsecretBarcodeScanResponse | null> {
    const existing = await this.findExistingBarcodeResponse(body);
    if (existing) {
      return existing;
    }
    const response = await this.fatsecretApiClient.bardcodeScan(body);
    await this.saveFoodResponseByBarcode(body, response);
    return response;
  }

  protected async getExistingFoodResponseByQuery(body: FatsecretFoodSearchRequest): Promise<FatsecretFoodSearchResponse|null> {
    const db = await this.drizzleService.getDb();
    const request = await db.query.fatsecretFoodRequests.findFirst({
      where: (t, op) => op.and(
        op.eq(t.searchExpression, body.SearchExpression),
        op.eq(t.pageNumber, body.PageNumber),
        op.eq(t.pageSize, body.PageSize),
      ),
      orderBy: (t, op) => [op.desc(t.createdAt)],
    });
    if (!request) {
      return null;
    }
    const response = await db.query.fatsecretFoodResponses.findMany({
      where: (t, op) => op.eq(t.requestId, request.id),
      orderBy: (t, op) => [op.asc(t.id)],
    });
    const recipes: FatsecretRecipe[] = response.map((x) => {
      const food: FatsecretRecipe = {
        id: x.externalId, // <== change
        status: x.status,
        title: x.title,
        source: x.source,
        shortDescription: x.shortDescription,
        energyPerPortion: x.energyPerPortion,
        carbohydratePerPortion: x.carbohydratePerPortion,
        proteinPerPortion: x.proteinPerPortion,
        fatPerPortion: x.fatPerPortion,
        gramsPerPortion: x.gramsPerPortion,
        userName: x.userName,
        pathName: x.pathName,
        defaultPortionID: x.defaultPortionId,
        defaultPortionAmount: x.defaultPortionAmount,
        defaultPortionDescription: x.defaultPortionDescription,
        defaultEnergyPerPortion: x.defaultEnergyPerPortion,
      };
      return food;
    });
    return {
      recipes,
      currentpage: request.currentPage,
      totalresults: request.totalResults,
      resultsPerPage: request.resultsPerPage,

    };
  }
  protected async saveFoodResponseByQuery(req: FatsecretFoodSearchRequest, response: FatsecretFoodSearchResponse) {
    const db = await this.drizzleService.getDb();
    const schema = await this.drizzleService.getSchema();
    await db.transaction(async (tx) => {
      const request = await tx.insert(schema.fatsecretFoodRequests).values({
        searchExpression: req.SearchExpression,
        pageNumber: req.PageNumber,
        pageSize: req.PageSize,
        totalResults: response.totalresults,
        currentPage: response.currentpage,
        resultsPerPage: response.resultsPerPage,
        createdAt: new Date(),
      }).returning({id: schema.fatsecretFoodRequests.id});
      const insertedRequest = request[0];
      if (!insertedRequest) {
        throw new Error('Failed to save food request');
      }

      await tx.insert(schema.fatsecretFoodResponses).values(response.recipes.map((x) => ({
        requestId: insertedRequest.id,
        externalId: x.id,
        title: x.title,
        status: x.status,
        source: x.source,
        shortDescription: x.shortDescription,
        energyPerPortion: x.energyPerPortion,
        carbohydratePerPortion: x.carbohydratePerPortion,
        proteinPerPortion: x.proteinPerPortion,
        fatPerPortion: x.fatPerPortion,
        gramsPerPortion: x.gramsPerPortion,
        userName: x.userName,
        pathName: x.pathName,
        defaultPortionId: x.defaultPortionID,
        defaultPortionAmount: x.defaultPortionAmount,
        defaultPortionDescription: x.defaultPortionDescription,
        defaultEnergyPerPortion: x.defaultEnergyPerPortion,
        createdAt: new Date(),
      })));

    });
  }


  protected async saveFoodResponseByBarcode(
    req: FatsecretBarcodeScanRequest,
    response: FatsecretBarcodeScanResponse | null
  ) {
    if (!response) {
      return;
    }
    const db = await this.drizzleService.getDb();
    const schema = await this.drizzleService.getSchema();
    await db.insert(schema.fatsecretBarcodeScanResponses).values({
      barcode: req.barcode,
      barcodeId: response.barcodeId,
      foodId: response.foodId,
      deviceCanPrompt: req.deviceCanPrompt,
      createdAt: new Date(),
    });

  }

  protected async findExistingBarcodeResponse(req: FatsecretBarcodeScanRequest): Promise<FatsecretBarcodeScanResponse | null> {
    const db = await this.drizzleService.getDb();

    const row = await db.query.fatsecretBarcodeScanResponses.findFirst({
      where: (t, op) => op.eq(t.barcode, req.barcode),
    });
    if (!row) {
      return null;
    }
    const response: FatsecretBarcodeScanResponse = {
      foodId: row.foodId,
      barcodeId: row.barcodeId,
      shouldPrompt: row.deviceCanPrompt,
    };
    return response;
  }

}
