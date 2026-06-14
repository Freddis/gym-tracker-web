import {describe, expect, test} from 'vitest';
import {TestUtils} from '../../utils/TestUtils/TestUtils';
import {FatsecretFoodSearchResponse} from './types/FatsecretFoodSearchResponse';

describe('FatsecretService', () => {
  test('Correctly parses brand and basic data from fatsecret response', async () => {
    const apiClient = await TestUtils.business.getFactory().fatsecretApiClient();
    const service = await TestUtils.business.getFactory().fatsecret();
    const response: FatsecretFoodSearchResponse = {
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
    apiClient.mockNextSearchResponse(response);
    const result = await service.getFoodByQuery({
      query: 'Шоколад',
    });

    //check
    expect(result.items.length).toBe(1);
    expect(result.items[0]?.id).toBe(13752496);
    expect(result.items[0]?.name).toBe('Шоколад Молочный с Молочной и Карамельной Начинками и Цельным Фундуком');
    expect(result.items[0]?.brand).toBe('Милка');
    expect(result.items[0]?.calories).toBe(553);
    expect(result.items[0]?.protein).toBe(5);
    expect(result.items[0]?.carbs).toBe(55);
    expect(result.items[0]?.fat).toBe(34);
    expect(result.items[0]?.servingSize).toBe(null);
  });

  test('Correctly parses serving size from fatsecret response', async () => {
    const apiClient = await TestUtils.business.getFactory().fatsecretApiClient();
    const service = await TestUtils.business.getFactory().fatsecret();
    const response: FatsecretFoodSearchResponse = {
      recipes: [
        {
          id: 2570222,
          title: 'Шоколад Вдохновение',
          status: 'Published',
          source: 'Facebook',
          // eslint-disable-next-line max-len
          shortDescription: 'mtypeS#E{P<A*R*A>T}O!R1S#E{P<A*R*A>T}O!RmnameS#E{P<A*R*A>T}O!RБабаевскийS#E{P<A*R*A>T}O!RssizeS#E{P<A*R*A>T}O!R1 порция (10г)',
          energyPerPortion: 55.2,
          carbohydratePerPortion: 3.55,
          proteinPerPortion: 1.14,
          fatPerPortion: 4,
          gramsPerPortion: 0,
          userName: '',
          // eslint-disable-next-line max-len
          pathName: 'ru/%D0%91%D0%B0%D0%B1%D0%B0%D0%B5%D0%B2%D1%81%D0%BA%D0%B8%D0%B9/%D0%A8%D0%BE%D0%BA%D0%BE%D0%BB%D0%B0%D0%B4-%D0%92%D0%B4%D0%BE%D1%85%D0%BD%D0%BE%D0%B2%D0%B5%D0%BD%D0%B8%D0%B5/1-%D0%BF%D0%BE%D1%80%D1%86%D0%B8%D1%8F',
          defaultPortionID: 0,
          defaultPortionAmount: 1,
          defaultPortionDescription: '1 порция (10г)',
          defaultEnergyPerPortion: 55.2,
        },
      ],
      totalresults: 1,
      currentpage: 0,
      resultsPerPage: 20,
    };
    //test
    apiClient.mockNextSearchResponse(response);
    const result = await service.getFoodByQuery({
      query: 'Шоколад Вдохновение',
    });
    console.log(result);
    //check
    expect(result.items[0]?.servingSize).toBe(10);
    expect(result.items[0]?.calories).toBe(552);
    expect(result.items[0]?.protein).toBe(11.4);
    expect(result.items[0]?.carbs).toBe(35.5);
    expect(result.items[0]?.fat).toBe(40);
  });

  test('Correctly parses 1g serving size from fatsecret response', async () => {
    const apiClient = await TestUtils.business.getFactory().fatsecretApiClient();
    const service = await TestUtils.business.getFactory().fatsecret();
    const response: FatsecretFoodSearchResponse = {
      recipes: [
        {
          id: 39727,
          title: 'White Rice (Short-Grain, Cooked)',
          status: 'Published',
          source: 'SingleFood',
          shortDescription: null,
          energyPerPortion: 130,
          carbohydratePerPortion: 28.73,
          proteinPerPortion: 2.36,
          fatPerPortion: 0.19,
          gramsPerPortion: 100,
          userName: '',
          pathName: 'usda/white-rice-(short-grain-cooked)',
          defaultPortionID: 62458,
          defaultPortionAmount: 100,
          defaultPortionDescription: 'g',
          defaultEnergyPerPortion: 1.3,
        },
      ],
      totalresults: 1,
      currentpage: 0,
      resultsPerPage: 20,
    };
    //test
    apiClient.mockNextSearchResponse(response);
    const result = await service.getFoodByQuery({
      query: 'Jasmin Rice',
    });
    console.log(result);
    //check
    expect(result.items[0]?.servingSize).toBe(null);
    expect(result.items[0]?.calories).toBe(130);
    expect(result.items[0]?.protein).toBe(2.36);
    expect(result.items[0]?.carbs).toBe(28.73);
    expect(result.items[0]?.fat).toBe(0.19);
  });

  test('Correctly parses cups serving size from fatsecret response', async () => {
    const apiClient = await TestUtils.business.getFactory().fatsecretApiClient();
    const service = await TestUtils.business.getFactory().fatsecret();
    const response: FatsecretFoodSearchResponse = {
      recipes: [
        {
          id: 17905017,
          title: 'Jasmine Rice (Cooked)',
          status: 'Published',
          source: 'FNDDS',
          shortDescription: null,
          energyPerPortion: 496,
          carbohydratePerPortion: 93.85,
          proteinPerPortion: 11.13,
          fatPerPortion: 7.3,
          gramsPerPortion: 292,
          userName: '',
          pathName: 'generic/rice-jasmine-cooked',
          defaultPortionID: 16883811,
          defaultPortionAmount: 1,
          defaultPortionDescription: 'cup, cooked',
          defaultEnergyPerPortion: 237.808,
        },
      ],
      totalresults: 1,
      currentpage: 0,
      resultsPerPage: 20,
    };
    //test
    apiClient.mockNextSearchResponse(response);
    const result = await service.getFoodByQuery({
      query: 'Jasmine Rice (Cooked)',
    });
    console.log(result);
    //check
    expect(result.items[0]?.servingSize).toBe(292);
    expect(result.items[0]?.calories).toBe(169.86);
    expect(result.items[0]?.protein).toBe(3.81);
    expect(result.items[0]?.carbs).toBe(32.14);
    expect(result.items[0]?.fat).toBe(2.5);
  });

});
