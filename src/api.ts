import {
  createStartAPIHandler,
  defaultAPIFileRouteHandler,
} from '@tanstack/react-start/api';
import {Logger} from './common/utils/Logger/Logger';
import {openApiInstance} from './backend/utils/openApiInstance';
import {openApiRoutes} from './backend/utils/openApiRoutes';

Logger.useJsonStringify = true;
openApiInstance.addRouteMap(openApiRoutes);
export default createStartAPIHandler(defaultAPIFileRouteHandler);
