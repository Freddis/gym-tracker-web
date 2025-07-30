import {createServerFileRoute} from '@tanstack/react-start/server';
import {globalServiceFactory} from '../backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';

const openApi = await globalServiceFactory.openApi();
const methods = openApi.wrappers.tanstackStart.createSwaggerMethods('/schema');
export const ServerRoute = createServerFileRoute('/swagger').methods(methods);

