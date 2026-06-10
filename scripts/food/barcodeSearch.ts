import {globalServiceFactory} from '../../src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';

const service = await globalServiceFactory.fatsecret();
const response = await service.searchFoodByBarcode(4640167407906);
console.log(response);
