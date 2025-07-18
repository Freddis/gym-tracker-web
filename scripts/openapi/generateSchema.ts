import {openApi} from '../../src/backend/utils/openApi';
import {openApiRoutes} from 'src/backend/utils/openApiRoutes';

openApi.addRouteMap(openApiRoutes);
openApi.clientGenerator.generate({
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/frontend/openapi-client',
  },
});
