import {createFileRoute} from '@tanstack/react-router';
import {globalServiceFactory} from '../backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';

const openApi = await globalServiceFactory.openApi();
const methods = openApi.wrappers.tanstackStart.createShemaMethods();
export const Route = createFileRoute('/api-schema')({
  server: {
    handlers: methods,
  },
});
