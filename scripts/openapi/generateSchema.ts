import {entries} from 'src/routes/api/v1/entries';
import {pgClient} from 'src/server/drizzle/db';
import {openApiInstance} from 'src/server/open-api/openApiInstance';

openApiInstance.addRoutes('', [
  entries,
]);

openApiInstance.saveYaml('./src/routes/api/html/openapi.yml');
await pgClient.end();
