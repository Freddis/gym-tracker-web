import {globalServiceFactory} from '../../src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';

const service = await globalServiceFactory.dbSync();
if (!service) {
  console.log('Db Sync service is not configured. Exiting.');
  process.exit(1);
}
await service.pushSync();
await globalServiceFactory.cleanup();
