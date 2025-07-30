import {createServerFileRoute} from '@tanstack/react-start/server';
import {globalServiceFactory} from '../backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';

const openApi = await globalServiceFactory.openApi();
const methods = openApi.wrappers.tanstackStart.createShemaMethods();
export const ServerRoute = createServerFileRoute('/schema').methods(methods);
