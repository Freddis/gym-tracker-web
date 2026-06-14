import {describe, expect, test} from 'vitest';
import {TestUtils} from '../../../../utils/TestUtils/TestUtils';
import {FatsecretFoodSearchResponse} from '../../types/FatsecretFoodSearchResponse';
import {FatsecretBarcodeScanResponse} from '../FatsecretApiClient/types/FatsecretBarcodeScanResponseSchema';

describe('CachingFatscretService', () => {

  test('Responds correctly to search request', async () => {
    const fatsecretClient = await TestUtils.business.getFactory().fatsecretApiClient();
    const service = await TestUtils.business.getFactory().cachingFatsecretApiClient();
    const fatsecretResponse: FatsecretFoodSearchResponse = {
      recipes: [
        {
          id: 13752496,
          title: 'Шоколад Молочный с Молочной и Карамельной Начинками и Цельным Фундуком',
          status: 'Published',
          source: 'Facebook',
          // eslint-disable-next-line max-len
          shortDescription: 'mtypeS#E{P<A*R*A>T}O!R1S#E{P<A*R*A>T}O!RmnameS#E{P<A*R*A>T}O!RМилкаS#E{P<A*R*A>T}O!RssizeS#E{P<A*R*A>T}O!R100г',
          energyPerPortion: 553,
          carbohydratePerPortion: 55,
          proteinPerPortion: 5,
          fatPerPortion: 34,
          gramsPerPortion: 0,
          userName: '',
          // eslint-disable-next-line max-len
          pathName: 'ru/%D0%9C%D0%B8%D0%BB%D0%BA%D0%B0/%D0%A8%D0%BE%D0%BA%D0%BE%D0%BB%D0%B0%D0%B4-%D0%9C%D0%BE%D0%BB%D0%BE%D1%87%D0%BD%D1%8B%D0%B9-%D1%81-%D0%9C%D0%BE%D0%BB%D0%BE%D1%87%D0%BD%D0%BE%D0%B9-%D0%B8-%D0%9A%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B9-%D0%9D%D0%B0%D1%87%D0%B8%D0%BD%D0%BA%D0%B0%D0%BC%D0%B8-%D0%B8-%D0%A6%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%BC-%D0%A4%D1%83%D0%BD%D0%B4/100%D0%B312951847',
          defaultPortionID: 0,
          defaultPortionAmount: 1,
          defaultPortionDescription: '100г',
          defaultEnergyPerPortion: 553,
        },
      ],
      totalresults: 1,
      currentpage: 0,
      resultsPerPage: 20,
    };

    // test
    fatsecretClient.mockNextSearchResponse(fatsecretResponse);
    const result = await service.searchFood({
      PageNumber: 0,
      PageSize: 20,
      SearchExpression: 'Шоколад',
    });

    //check
    expect(result.recipes.length).toBe(1);
    expect(result.recipes[0]?.id).toBe(13752496);
    expect(result.recipes[0]?.title).toBe('Шоколад Молочный с Молочной и Карамельной Начинками и Цельным Фундуком');
    expect(result.recipes[0]?.source).toBe('Facebook');
    // eslint-disable-next-line max-len
    expect(result.recipes[0]?.shortDescription).toBe('mtypeS#E{P<A*R*A>T}O!R1S#E{P<A*R*A>T}O!RmnameS#E{P<A*R*A>T}O!RМилкаS#E{P<A*R*A>T}O!RssizeS#E{P<A*R*A>T}O!R100г');
    expect(result.recipes[0]?.energyPerPortion).toBe(553);
    expect(result.recipes[0]?.carbohydratePerPortion).toBe(55);
    expect(result.recipes[0]?.proteinPerPortion).toBe(5);
    expect(result.recipes[0]?.fatPerPortion).toBe(34);
    expect(result.recipes[0]?.gramsPerPortion).toBe(0);
    expect(result.recipes[0]?.userName).toBe('');
    // eslint-disable-next-line max-len
    expect(result.recipes[0]?.pathName).toBe('ru/%D0%9C%D0%B8%D0%BB%D0%BA%D0%B0/%D0%A8%D0%BE%D0%BA%D0%BE%D0%BB%D0%B0%D0%B4-%D0%9C%D0%BE%D0%BB%D0%BE%D1%87%D0%BD%D1%8B%D0%B9-%D1%81-%D0%9C%D0%BE%D0%BB%D0%BE%D1%87%D0%BD%D0%BE%D0%B9-%D0%B8-%D0%9A%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B9-%D0%9D%D0%B0%D1%87%D0%B8%D0%BD%D0%BA%D0%B0%D0%BC%D0%B8-%D0%B8-%D0%A6%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%BC-%D0%A4%D1%83%D0%BD%D0%B4/100%D0%B312951847');
    expect(result.recipes[0]?.defaultPortionID).toBe(0);
    expect(result.recipes[0]?.defaultPortionAmount).toBe(1);
    expect(result.recipes[0]?.defaultPortionDescription).toBe('100г');
    expect(result.recipes[0]?.defaultEnergyPerPortion).toBe(553);

  });

  test('Saves query responses to the database', async () => {
    const fatsecretClient = await TestUtils.business.getFactory().fatsecretApiClient();
    const service = await TestUtils.business.getFactory().cachingFatsecretApiClient();
    const drizzle = await TestUtils.business.getFactory().drizzle();
    const db = await drizzle.getDb();
    const schema = await drizzle.getSchema();
    await db.delete(schema.fatsecretFoodResponses);
    await db.delete(schema.fatsecretFoodRequests);
    const fatsecretResponse: FatsecretFoodSearchResponse = {
      recipes: [
        {
          id: 13752496,
          title: 'Шоколад Молочный с Молочной и Карамельной Начинками и Цельным Фундуком',
          status: 'Published',
          source: 'Facebook',
          // eslint-disable-next-line max-len
          shortDescription: 'mtypeS#E{P<A*R*A>T}O!R1S#E{P<A*R*A>T}O!RmnameS#E{P<A*R*A>T}O!RМилкаS#E{P<A*R*A>T}O!RssizeS#E{P<A*R*A>T}O!R100г',
          energyPerPortion: 553,
          carbohydratePerPortion: 55,
          proteinPerPortion: 5,
          fatPerPortion: 34,
          gramsPerPortion: 0,
          userName: '',
          // eslint-disable-next-line max-len
          pathName: 'ru/%D0%9C%D0%B8%D0%BB%D0%BA%D0%B0/%D0%A8%D0%BE%D0%BA%D0%BE%D0%BB%D0%B0%D0%B4-%D0%9C%D0%BE%D0%BB%D0%BE%D1%87%D0%BD%D1%8B%D0%B9-%D1%81-%D0%9C%D0%BE%D0%BB%D0%BE%D1%87%D0%BD%D0%BE%D0%B9-%D0%B8-%D0%9A%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B9-%D0%9D%D0%B0%D1%87%D0%B8%D0%BD%D0%BA%D0%B0%D0%BC%D0%B8-%D0%B8-%D0%A6%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%BC-%D0%A4%D1%83%D0%BD%D0%B4/100%D0%B312951847',
          defaultPortionID: 0,
          defaultPortionAmount: 1,
          defaultPortionDescription: '100г',
          defaultEnergyPerPortion: 553,
        },
      ],
      totalresults: 1,
      currentpage: 0,
      resultsPerPage: 20,
    };

    //pre-check
    const existing = await db.query.fatsecretFoodRequests.findFirst();
    expect(existing).toBeUndefined();
    const existingResponse = await db.query.fatsecretFoodResponses.findFirst();
    expect(existingResponse).toBeUndefined();

    // test
    fatsecretClient.mockNextSearchResponse(fatsecretResponse);
    await service.searchFood({
      PageNumber: 0,
      PageSize: 20,
      SearchExpression: 'Шоколад',
    });

    const request = await db.query.fatsecretFoodRequests.findFirst({
      orderBy: (t, op) => [op.desc(t.createdAt)],
    });
    expect(request).not.toBeNull();
    expect(request?.searchExpression).toBe('Шоколад');
    expect(request?.pageNumber).toBe(0);
    expect(request?.pageSize).toBe(20);
    expect(request?.totalResults).toBe(1);
    expect(request?.currentPage).toBe(0);
    expect(request?.resultsPerPage).toBe(20);

    const responseRows = await db.query.fatsecretFoodResponses.findMany({
      where: (t, op) => op.eq(t.requestId, request?.id ?? 0),
      orderBy: (t, op) => [op.desc(t.createdAt)],
    });
    const response = responseRows[0];
    expect(response).not.toBeNull();
    expect(response?.externalId).toBe(13752496);
    expect(response?.title).toBe('Шоколад Молочный с Молочной и Карамельной Начинками и Цельным Фундуком');
    expect(response?.status).toBe('Published');
    expect(response?.source).toBe('Facebook');
    // eslint-disable-next-line max-len
    expect(response?.shortDescription).toBe('mtypeS#E{P<A*R*A>T}O!R1S#E{P<A*R*A>T}O!RmnameS#E{P<A*R*A>T}O!RМилкаS#E{P<A*R*A>T}O!RssizeS#E{P<A*R*A>T}O!R100г');
    expect(response?.energyPerPortion).toBe(553);
    expect(response?.carbohydratePerPortion).toBe(55);
    expect(response?.proteinPerPortion).toBe(5);
    expect(response?.fatPerPortion).toBe(34);
    expect(response?.gramsPerPortion).toBe(0);
    expect(response?.userName).toBe('');
    // eslint-disable-next-line max-len
    expect(response?.pathName).toBe('ru/%D0%9C%D0%B8%D0%BB%D0%BA%D0%B0/%D0%A8%D0%BE%D0%BA%D0%BE%D0%BB%D0%B0%D0%B4-%D0%9C%D0%BE%D0%BB%D0%BE%D1%87%D0%BD%D1%8B%D0%B9-%D1%81-%D0%9C%D0%BE%D0%BB%D0%BE%D1%87%D0%BD%D0%BE%D0%B9-%D0%B8-%D0%9A%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B9-%D0%9D%D0%B0%D1%87%D0%B8%D0%BD%D0%BA%D0%B0%D0%BC%D0%B8-%D0%B8-%D0%A6%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%BC-%D0%A4%D1%83%D0%BD%D0%B4/100%D0%B312951847');
    expect(response?.defaultPortionId).toBe(0);
    expect(response?.defaultPortionAmount).toBe(1);
    expect(response?.defaultPortionDescription).toBe('100г');
    expect(response?.defaultEnergyPerPortion).toBe(553);
    expect(response?.createdAt).toBeDefined();
  });

  test('Responds correctly to search request from database', async () => {
    const fatsecretClient = await TestUtils.business.getFactory().fatsecretApiClient();
    const service = await TestUtils.business.getFactory().cachingFatsecretApiClient();
    const drizzle = await TestUtils.business.getFactory().drizzle();
    const db = await drizzle.getDb();
    const schema = await drizzle.getSchema();
    await db.delete(schema.fatsecretFoodResponses);
    await db.delete(schema.fatsecretFoodRequests);
    const fatsecretResponse: FatsecretFoodSearchResponse = {
      recipes: [
        {
          id: 13752496,
          title: 'Шоколад Молочный с Молочной и Карамельной Начинками и Цельным Фундуком',
          status: 'Published',
          source: 'Facebook',
          // eslint-disable-next-line max-len
          shortDescription: 'mtypeS#E{P<A*R*A>T}O!R1S#E{P<A*R*A>T}O!RmnameS#E{P<A*R*A>T}O!RМилкаS#E{P<A*R*A>T}O!RssizeS#E{P<A*R*A>T}O!R100г',
          energyPerPortion: 553,
          carbohydratePerPortion: 55,
          proteinPerPortion: 5,
          fatPerPortion: 34,
          gramsPerPortion: 0,
          userName: '',
          // eslint-disable-next-line max-len
          pathName: 'ru/%D0%9C%D0%B8%D0%BB%D0%BA%D0%B0/%D0%A8%D0%BE%D0%BA%D0%BE%D0%BB%D0%B0%D0%B4-%D0%9C%D0%BE%D0%BB%D0%BE%D1%87%D0%BD%D1%8B%D0%B9-%D1%81-%D0%9C%D0%BE%D0%BB%D0%BE%D1%87%D0%BD%D0%BE%D0%B9-%D0%B8-%D0%9A%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B9-%D0%9D%D0%B0%D1%87%D0%B8%D0%BD%D0%BA%D0%B0%D0%BC%D0%B8-%D0%B8-%D0%A6%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%BC-%D0%A4%D1%83%D0%BD%D0%B4/100%D0%B312951847',
          defaultPortionID: 0,
          defaultPortionAmount: 1,
          defaultPortionDescription: '100г',
          defaultEnergyPerPortion: 553,
        },
      ],
      totalresults: 1,
      currentpage: 0,
      resultsPerPage: 20,
    };

    // test
    fatsecretClient.mockNextSearchResponse(fatsecretResponse);
    const response1 = await service.searchFood({
      PageNumber: 0,
      PageSize: 20,
      SearchExpression: 'Шоколад',
    });
    expect(response1).toEqual(fatsecretResponse);
    // making sure that requests are retrieved from the db, but asking for the new page without mocking the resposnse
    await expect(async () => {
      await service.searchFood({
        PageNumber: 1,
        PageSize: 20,
        SearchExpression: 'Шоколад',
      });
    }).rejects.toThrow('No search search response mocked. Preventing send to the prod server.');
    // and now the same for the cached and it should be retrieved from the db
    const response2 = await service.searchFood({
      PageNumber: 0,
      PageSize: 20,
      SearchExpression: 'Шоколад',
    });
    expect(response2).toEqual(fatsecretResponse);
  });

  test('Responds correctly to barcode scan request', async () => {
    const fatsecretClient = await TestUtils.business.getFactory().fatsecretApiClient();
    const service = await TestUtils.business.getFactory().cachingFatsecretApiClient();
    const fatsecretResponse: FatsecretBarcodeScanResponse = {
      foodId: 13752496,
      barcodeId: 12951847,
      shouldPrompt: true,
    };

    // test
    fatsecretClient.mockNextBarcodeScanResponse(fatsecretResponse);
    const result = await service.bardcodeScan({
      barcode: '1234567890',
      deviceCanPrompt: true,
    });

    //check
    expect(result?.foodId).toBe(13752496);
    expect(result?.barcodeId).toBe(12951847);
    expect(result?.shouldPrompt).toBe(true);
  });

  test('Saves barcode scan response to the database', async () => {
    const fatsecretClient = await TestUtils.business.getFactory().fatsecretApiClient();
    const service = await TestUtils.business.getFactory().cachingFatsecretApiClient();
    const drizzle = await TestUtils.business.getFactory().drizzle();
    const db = await drizzle.getDb();
    const schema = await drizzle.getSchema();
    await db.delete(schema.fatsecretBarcodeScanResponses);
    const fatsecretResponse: FatsecretBarcodeScanResponse = {
      foodId: 13752496,
      barcodeId: 12951847,
      shouldPrompt: true,
    };

    //pre-check
    const existing = await db.query.fatsecretBarcodeScanResponses.findFirst();
    expect(existing).toBeUndefined();

    // test
    fatsecretClient.mockNextBarcodeScanResponse(fatsecretResponse);
    await service.bardcodeScan({
      barcode: '1234567890',
      deviceCanPrompt: true,
    });

    const request = await db.query.fatsecretBarcodeScanResponses.findFirst({
      orderBy: (t, op) => [op.desc(t.createdAt)],
    });
    expect(request).not.toBeNull();
    expect(request?.barcode).toBe('1234567890');
    expect(request?.foodId).toBe(13752496);
    expect(request?.barcodeId).toBe(12951847);
    expect(request?.deviceCanPrompt).toBe(true);
    expect(request?.createdAt).toBeDefined();
  });

  test('Responds correctly to search request from database', async () => {
    const fatsecretClient = await TestUtils.business.getFactory().fatsecretApiClient();
    const service = await TestUtils.business.getFactory().cachingFatsecretApiClient();
    const drizzle = await TestUtils.business.getFactory().drizzle();
    const db = await drizzle.getDb();
    const schema = await drizzle.getSchema();
    await db.delete(schema.fatsecretBarcodeScanResponses);
    const fatsecretResponse: FatsecretBarcodeScanResponse = {
      foodId: 13752496,
      barcodeId: 12951847,
      shouldPrompt: true,
    };

    // test
    fatsecretClient.mockNextBarcodeScanResponse(fatsecretResponse);
    const response1 = await service.bardcodeScan({
      barcode: '1234567890',
      deviceCanPrompt: true,
    });
    expect(response1).toEqual(fatsecretResponse);
    // making sure that requests are retrieved from the db, but asking for another barcode without mocking the resposnse
    await expect(async () => {
      await service.bardcodeScan({
        barcode: '1234567891',
        deviceCanPrompt: true,
      });
    }).rejects.toThrow('No search barcode response mocked. Preventing send to the prod server.');
    // and now the same for the cached and it should be retrieved from the db
    const response2 = await service.bardcodeScan({
      barcode: '1234567890',
      deviceCanPrompt: true,
    });
    expect(response2).toEqual(fatsecretResponse);
  });

});
