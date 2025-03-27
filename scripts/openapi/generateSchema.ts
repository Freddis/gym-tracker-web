import {entries} from '../../src/routes/api/v1/entries';
import {types} from '../../src/routes/api/v1/types';
import {pgClient} from '../../src/server/drizzle/db';
import {openApiInstance} from '../../src/server/open-api/openApiInstance';

openApiInstance.addRoutes('', [
  entries,
  types,
]);

openApiInstance.saveYaml('./src/routes/api/html/openapi.yml');
await pgClient.end();
