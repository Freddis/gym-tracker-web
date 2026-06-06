import {globalServiceFactory} from '../../src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';

const service = await globalServiceFactory.fatsecret();
const response = await service.searchFoodByBarcode(4630056985554);
console.log(response);
