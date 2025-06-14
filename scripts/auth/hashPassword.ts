import {argv} from 'process';
import {globalServiceFactory} from 'src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';
import {Logger} from 'src/common/utils/Logger/Logger';

const logger = new Logger('Generate Password');
const auth = await globalServiceFactory.auth();
const password = argv[2];
if (!password) {
  logger.die('Pass password to hash as parameter to the script');
  process.exit();
}
const hashed = await auth.hashString(password);
logger.info('Hashed string:');
logger.info(hashed);
