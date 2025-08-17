import {globalServiceFactory} from 'src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';

const reDownloadCheckins = process.argv[2];
const service = await globalServiceFactory.argus();
if (!service) {
  console.log('Argus service is not configured. Exiting.');
  process.exit(1);
}
await service.wipeData();
await service.downloadEntries(!!reDownloadCheckins);
await service.importEntries();
await service.seedUser();
await service.createExerciseLibrary();
await service.importWorkouts();
await globalServiceFactory.cleanup();
