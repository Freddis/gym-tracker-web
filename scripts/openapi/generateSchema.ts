import {pgClient} from '../../src/server/drizzle/db';
import {openApiInstance} from '../../src/openApiInstance';
import {openApiRoutes} from 'src/openApiRoutes';

openApiInstance.addRoutesByMap(openApiRoutes);
openApiInstance.saveYaml('./src/routes/api/html/openapi.yml');
await pgClient.end();
