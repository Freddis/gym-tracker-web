import {createFileRoute} from '@tanstack/react-router';
import {globalServiceFactory} from '../backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';

const openApi = await globalServiceFactory.openApi();
const methods = openApi.wrappers.tanstackStart.createSwaggerMethods('/api-schema');
export const Route = createFileRoute('/swagger')({
  server: {
    handlers: methods,
  },
});

