import {
  createStartAPIHandler,
  defaultAPIFileRouteHandler,
} from '@tanstack/react-start/api';
import {Logger} from './utls/Logger/Logger';
import {openApiInstance} from './openApiInstance';
import {openApiRoutes} from './openApiRoutes';

Logger.useJsonStringify = true;
openApiInstance.addRoutesByMap(openApiRoutes);
export default createStartAPIHandler(defaultAPIFileRouteHandler);
