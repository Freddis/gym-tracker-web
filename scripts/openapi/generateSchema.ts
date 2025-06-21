import {openApiInstance} from '../../src/backend/utils/openApiInstance';
import {openApiRoutes} from 'src/backend/utils/openApiRoutes';

openApiInstance.addRouteMap(openApiRoutes);
openApiInstance.saveYaml('./src/routes/api/html/openapi.yml');
