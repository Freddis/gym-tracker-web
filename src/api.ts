import {
  createStartAPIHandler,
  defaultAPIFileRouteHandler,
} from '@tanstack/react-start/api';
import {Logger} from './utls/Logger/Logger';
import {openApiInstance} from './server/open-api/openApiInstance';
import {entries} from './routes/api/v1/entries';
import {types} from './routes/api/v1/types';

Logger.useJsonStringify = true;
openApiInstance.addRoutes('', [
  entries,
  types,
]);
export default createStartAPIHandler(defaultAPIFileRouteHandler);
