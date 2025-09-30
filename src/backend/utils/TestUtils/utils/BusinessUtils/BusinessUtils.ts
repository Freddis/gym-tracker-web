import {serverConfig} from '../../../ServerConfig/config';
import {GlobalServiceFactoryMock} from './utils/GlobalServiceFactoryMock';

export class BusinessUtils {
  protected static factory = new GlobalServiceFactoryMock(serverConfig);

  static getFactory(): GlobalServiceFactoryMock {
    return this.factory;
  }
}
