import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server';
import {createRouter} from './router';
import {Logger} from './common/utils/Logger/Logger';
import {openApi} from './backend/utils/openApi';
import {openApiRoutes} from './backend/utils/openApiRoutes';

Logger.useJsonStringify = true;
openApi.addRouteMap(openApiRoutes);
export default createStartHandler({
  createRouter,
})(defaultStreamHandler);
