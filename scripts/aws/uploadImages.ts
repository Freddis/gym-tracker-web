
import {readdirSync, readFileSync, realpathSync} from 'node:fs';
import {join} from 'node:path';
import {globalServiceFactory} from '../../src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';
import {Logger} from '../../src/common/utils/Logger/Logger';

const logger = new Logger('uploadImages');
logger.info('Start');
const path = realpathSync('temp/images');
const files = readdirSync(path);
const service = await globalServiceFactory.image();
let i = 0;
for (const imgName of files) {
  logger.info(`Processing ${++i}/${files.length}: ${imgName}`);
  const filePath = join(path, imgName);
  const file = readFileSync(filePath);
  const existing = await service.getImageByName(imgName);
  if (existing) {
    logger.info('Already exists, skipping.');
    continue;
  }
  const image = await service.createFromFile(file, imgName);
  logger.info(`${image.url}`);
}
logger.info('Cleanup');
await globalServiceFactory.cleanup();
logger.info('Done');
