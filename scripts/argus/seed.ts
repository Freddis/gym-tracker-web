import {globalServiceFactory} from 'src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';
import {ArgusService} from '../../src/backend/services/ArgusService/ArgusService';
import {EnvHelper} from 'src/backend/utils/EnvHelper/EnvHelper';
import {existsSync, mkdirSync, realpathSync} from 'fs';
import {join} from 'path';
import {ArgusServiceConfig} from 'src/backend/services/ArgusService/types/ArgusServiceConfig';

const reDownloadCheckins = process.argv[2];
const drizzle = await globalServiceFactory.drizzle();
const tempPath = join(realpathSync('.'), '/temp');
if (!existsSync(tempPath)) {
  mkdirSync(tempPath);
}
const config: ArgusServiceConfig = {
  tempFolderPath: tempPath,
  seededUser: {
    name: EnvHelper.getString('SEED_USER_NAME'),
    email: EnvHelper.getString('SEED_USER_EMAIL'),
    password: EnvHelper.getString('SEED_USER_PASSWORD'),
    argusAuthToken: EnvHelper.getString('AUTH_TOKEN'),
  },
};
const service = new ArgusService(drizzle, config);

await service.wipeData();
await service.downloadEntries(!!reDownloadCheckins);
await service.importEntries();
await service.seedUser();
await service.createExerciseLibrary();
await service.importWorkouts();
await globalServiceFactory.cleanup();
