import {serverConfig} from '../ServerConfig/config';
import {GlobalServiceFactory} from './GlobalServiceFactory';

export const globalServiceFactory = new GlobalServiceFactory(serverConfig);
