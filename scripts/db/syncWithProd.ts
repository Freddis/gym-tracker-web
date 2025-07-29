import {globalServiceFactory} from '../../src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';

const service = await globalServiceFactory.dbSync();
await service.pushSync();
await globalServiceFactory.cleanup();
