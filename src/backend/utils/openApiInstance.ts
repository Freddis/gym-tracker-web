import {GlobalServiceFactory} from './GlobalServiceFactory/GlobalServiceFactory';

export const openApiInstance = await new GlobalServiceFactory().openApi();
