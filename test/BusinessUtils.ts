import {GlobalServiceFactory} from '../src/backend/utils/GlobalServiceFactory/GlobalServiceFactory';
import {globalServiceFactory} from '../src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';

export class BusinessUtils {
  static getFactory(): GlobalServiceFactory {
    return globalServiceFactory;
  }
}
