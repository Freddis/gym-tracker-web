import {createServerFileRoute} from '@tanstack/react-start/server';
import {globalServiceFactory} from '../backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';

const openApi = await globalServiceFactory.openApi();
const methods = openApi.wrappers.tanstackStart.getOpenApiRootMethods();
export const ServerRoute = createServerFileRoute('/api').methods(methods);

