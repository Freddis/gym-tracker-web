import {globalServiceFactory} from '../../src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';

const openApi = await globalServiceFactory.openApi();
openApi.clientGenerator.generate({
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/frontend/utils/openapi-client',
  },
});
