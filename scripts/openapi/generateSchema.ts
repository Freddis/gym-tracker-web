import {pgClient} from '../../src/backend/drizzle/db';
import {openApiInstance} from '../../src/backend/utils/openApiInstance';
import {openApiRoutes} from 'src/backend/utils/openApiRoutes';

openApiInstance.addRoutesByMap(openApiRoutes);
openApiInstance.saveYaml('./src/routes/api/html/openapi.yml');
await pgClient.end();
