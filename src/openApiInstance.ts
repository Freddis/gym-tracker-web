import {GlobalServiceFactory} from './server/utils/GlobalServiceFactory/GlobalServiceFactory';

export const openApiInstance = await new GlobalServiceFactory().openApi();

