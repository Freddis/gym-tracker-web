import {globalServiceFactory} from '../../src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';

const argus = await globalServiceFactory.argus();
await argus.createMusclesAndEquipmentForExercises();
await globalServiceFactory.cleanup();
