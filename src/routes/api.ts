import {createFileRoute} from '@tanstack/react-router';
import {globalServiceFactory} from '../backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';

const openApi = await globalServiceFactory.openApi();
const methods = openApi.wrappers.tanstackStart.getOpenApiRootMethods();
export const Route = createFileRoute('/api')({
  server: {
    handlers: methods,
  },
});

