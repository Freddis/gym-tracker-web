import {globalServiceFactory} from 'src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';

const service = await globalServiceFactory.argus();
await service.downloadImages();
await globalServiceFactory.cleanup();

