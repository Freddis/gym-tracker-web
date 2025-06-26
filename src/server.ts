import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server';
import {createRouter} from './router';
import {Logger} from './common/utils/Logger/Logger';
import {openApiInstance} from './backend/utils/openApiInstance';
import {openApiRoutes} from './backend/utils/openApiRoutes';

Logger.useJsonStringify = true;
openApiInstance.addRouteMap(openApiRoutes);

export default createStartHandler({
  createRouter,
})(defaultStreamHandler);
