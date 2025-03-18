import {join} from 'path';
import {EnvHelper} from '../../src/utls/EnvHelper/EnvHelper';
import {Logger} from '../../src/utls/Logger/Logger';
import {existsSync, readFileSync, realpathSync, writeFileSync} from 'fs';
import {z} from 'zod';
import {ArgusCheckin, argusCheckinValidator} from './validators/ArgusCheckin';
import {argusResponseValidator} from './validators/ArgusResponse';


const logger = new Logger('Download');

const authtoken = EnvHelper.getString('AUTH_TOKEN');
const scriptPath = join(realpathSync('.'), '/scripts/seed');
const tempPath = join(scriptPath, 'temp');
// logger.info('Cleaning up');
// const files = readdirSync(path);
// for (const file of files) {
//   const filePath = join(path, file);
//   unlinkSync(filePath);
// }

logger.info('Loading checkings ids');
const name = 'checkins';
const checkinsPath = join(tempPath, `${name}.json`);
const checkinsValidator = argusResponseValidator.extend({
  checkins: z.object({
    id: z.string(),
  }).array(),
});
if (!existsSync(checkinsPath)) {
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
  logger.info('Checkins bukk file exists');
}
const checkinsFile = readFileSync(checkinsPath);
const data = JSON.parse(checkinsFile.toString());
const checkinsReponse = checkinsValidator.parse(data);
let i = 0;
const checkins: ArgusCheckin[] = [];
for (const row of checkinsReponse.checkins) {
  i++;
  const id = row.id;
  logger.info(`Loading checkin id: ${id}`);
  const checkinPath = join(tempPath, `${i}_${id}.json`);
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
const seedPath = join(scriptPath, '/available/real.json');
logger.info('Wrtings seed file to: ', {seedPath});
checkinsReponse.checkins = checkins;
writeFileSync(seedPath, JSON.stringify(checkinsReponse));
logger.info('Done');
