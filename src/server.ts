import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server';
import {createRouter} from './router';
import {openApi} from './backend/utils/openApi';
import {openApiRoutes} from './backend/utils/openApiRoutes';

openApi.addRouteMap(openApiRoutes);
export default createStartHandler({
  createRouter,
})(defaultStreamHandler);
