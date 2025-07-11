import {openApi} from '../../src/backend/utils/openApi';
import {openApiRoutes} from 'src/backend/utils/openApiRoutes';

openApi.addRouteMap(openApiRoutes);
openApi.clientGenerator.generate({
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/frontend/openapi-client',
  },
  plugins: [
    {
      name: '@hey-api/client-axios',
      throwOnError: false,
    },
    {
      name: '@tanstack/react-query',
    },
    {
      name: '@hey-api/transformers',
      dates: true,
    },
    {
      name: '@hey-api/sdk',
      transformer: true,
    },
    {
      name: '@hey-api/typescript',
      enums: 'javascript',
    },
  ],
});
