import {globalServiceFactory} from '../../src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';

const service = await globalServiceFactory.fatsecret();
const product = await service.getFoodByQuery({
  query: 'хлопья unicorn',
  page: 1,
});
console.dir(product, {depth: null});
