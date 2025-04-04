import {join} from 'path';
import {Logger} from '../../src/common/utils/Logger/Logger';
import {existsSync, readFileSync, realpathSync, writeFileSync} from 'fs';
import {z} from 'zod';
import {ArgusCheckin, argusCheckinValidator} from './validators/ArgusCheckin';
import {argusResponseValidator} from './validators/ArgusResponse';
import {EnvHelper} from 'src/backend/utils/EnvHelper/EnvHelper';

const logger = new Logger('Download');
const reDownloadCheckins = process.argv[2];
const authtoken = EnvHelper.getString('AUTH_TOKEN');
const scriptPath = join(realpathSync('.'), '/scripts');
const tempPath = join(scriptPath, '/argus/temp');

logger.info('Loading checking ids');
const name = 'checkins';
const checkinsPath = join(tempPath, `${name}.json`);

const checkinsValidator = argusResponseValidator.extend({
  checkins: z.object({
    id: z.string(),
  }).array(),
});
if (!existsSync(checkinsPath) || reDownloadCheckins) {
  logger.info('Downloading checkins from Azumio');
  const url = 'http://azumio.com/v2/checkins.csv?_fields=id&limit=1000000';
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Cookie: `oath_token_azumio=${authtoken}`,
    },
  });

  const data = await response.json();
  const validated = checkinsValidator.safeParse(data);
  if (!validated.success) {
    const err = new Error("Couldn't validate data");
    logger.error(null, err, {data, erros: validated.error});
    throw err;
  }
  logger.info('Writing file: ', {checkinsPath});
  writeFileSync(checkinsPath, JSON.stringify(data));
} else {
  logger.info('Checkins bulk file exists');
}
const checkinsFile = readFileSync(checkinsPath);
const data = JSON.parse(checkinsFile.toString());
const checkinsReponse = checkinsValidator.parse(data);
let i = 0;
const count = checkinsReponse.checkins.length;
const checkins: ArgusCheckin[] = [];
for (const row of checkinsReponse.checkins) {
  i++;
  const id = row.id;
  logger.info(`Loading checkin id: ${id}, ${i}/${count}`);
  const checkinPath = join(tempPath, `${id}.json`);
  let data: unknown = null;
  if (existsSync(checkinPath)) {
    logger.info(`Checkin id ${id}, already exists`);
    const content = readFileSync(checkinPath);
    data = JSON.parse(content.toString());
  }
  if (!data) {
    const url = `http://azumio.com/v2/checkins/${id}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Cookie: `oath_token_azumio=${authtoken}`,
      },
    });
    data = await response.json();
  }
  const validated = argusCheckinValidator.safeParse(data);
  if (!validated.success) {
    const err = new Error("Couldn't validate data");
    logger.error(null, err, {data, erros: validated.error});
    throw err;
  }
  logger.info('Writing file: ', {checkinPath});
  writeFileSync(checkinPath, JSON.stringify(data));
  checkins.push(validated.data);
}
const seedPath = join(scriptPath, '/seed/available/real.json');
logger.info('Wrtings seed file to: ', {seedPath});
checkinsReponse.checkins = checkins;
writeFileSync(seedPath, JSON.stringify(checkinsReponse));
logger.info('Done');
