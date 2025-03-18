import {join} from 'path';
import {Logger} from '../../src/utls/Logger/Logger';
import {readFileSync, realpathSync} from 'fs';
import {db, dbSchema, pgClient} from '../../src/server/drizzle/db';
import {argusResponseValidator} from './validators/ArgusResponse';

const logger = new Logger('Seeds');
logger.info('Starting seeds');
const seedName = process.argv[2] ?? 'sample';
const path = realpathSync('./scripts/seed/available/');
logger.info('Reading path', {path});
const entries: Omit<typeof dbSchema.entries.$inferInsert, 'id'>[] = [];
const filePath = join(path, `${seedName}.json`);
const json = readFileSync(filePath).toString();
const data = JSON.parse(json);
logger.info('Data', {data});
const validatedData = argusResponseValidator.safeParse(data);
if (!validatedData.success) {
  const err = new Error("Couldn't validate data");
  logger.error(null, err, validatedData.error);
  throw err;
}

for (const checkin of validatedData.data.checkins) {
  const createdAt = new Date(checkin.created);
  const entry: Omit<typeof dbSchema.entries.$inferInsert, 'id'> = {
    type: checkin.type,
    externalId: checkin.id,
    createdAt: createdAt,
    updatedAt: null,
    data: checkin,
    subtype: checkin.subtype ?? null,
  };
  entries.push(entry);
}


logger.info('Cleaning up db');
await db.delete(dbSchema.entries);

logger.info('Inserting entries');
for (const entry of entries) {
  await db.insert(dbSchema.entries).values(entry);
}
await pgClient.end();
console.log(`Done, added ${entries.length} entries`);
