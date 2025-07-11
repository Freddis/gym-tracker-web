import {GlobalServiceFactory} from './GlobalServiceFactory/GlobalServiceFactory';

export const openApi = await new GlobalServiceFactory().openApi();
