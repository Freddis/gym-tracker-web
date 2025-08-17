import {globalServiceFactory} from '../../src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';

const service = await globalServiceFactory.argus();
if (!service) {
  console.log('Argus service is not configured. Exiting.');
  process.exit(1);
}
await service.createMusclesAndEquipmentForExercises();
await globalServiceFactory.cleanup();
