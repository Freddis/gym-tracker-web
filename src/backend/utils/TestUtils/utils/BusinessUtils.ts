import {GlobalServiceFactory} from '../../GlobalServiceFactory/GlobalServiceFactory';
import {globalServiceFactory} from '../../GlobalServiceFactory/globalServiceFactoryInstance';

export class BusinessUtils {
  static getFactory(): GlobalServiceFactory {
    return globalServiceFactory;
  }
}
