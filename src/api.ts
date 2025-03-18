import {
  createStartAPIHandler,
  defaultAPIFileRouteHandler,
} from '@tanstack/react-start/api';
import {Logger} from './utls/Logger/Logger';
import {openApiInstance} from './server/open-api/openApiInstance';
import {entries} from './routes/api/v1/entries';

Logger.useJsonStringify = true;
openApiInstance.addRoutes('', [
  entries,
]);
export default createStartAPIHandler(defaultAPIFileRouteHandler);
