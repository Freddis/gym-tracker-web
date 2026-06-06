import {globalServiceFactory} from '../../src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';

const service = await globalServiceFactory.fatsecret();
const product = await service.searchFood({
  PageNumber: 0,
  PageSize: 20,
  SearchExpression: 'хлопья unicorn',
});
console.dir(product, {depth: null});
