import {globalServiceFactory} from 'src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';

const reDownloadCheckins = process.argv[2];
const service = await globalServiceFactory.argus();

await service.wipeData();
await service.downloadEntries(!!reDownloadCheckins);
await service.importEntries();
await service.seedUser();
await service.createExerciseLibrary();
await service.importWorkouts();
await globalServiceFactory.cleanup();
