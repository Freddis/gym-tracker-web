import 'snap-on-openapi';
import {ArgusCheckinType} from '../../src/backend/services/DrizzleService/types/ArgusCheckinRow/types/ArgusCheckinType';
import {globalServiceFactory} from '../../src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';
import {argusStatusCheckinValidator} from '../../src/backend/services/DrizzleService/types/ArgusCheckinRow/validators/ArgusStatusCheckin';
import {EntryRow} from '../../src/backend/services/DrizzleService/types/EntryRow';
import {EntryType} from '../../src/backend/services/EntryService/types/EntryType';
import {ExternalSource} from '../../src/backend/services/EntryService/types/ExternalSource';
import {EntryVisibility} from '../../src/backend/services/EntryService/types/EntryVisibility';
import {ImageType} from '../../src/backend/types/ImageType';
import {Logger} from '../../src/backend/utils/Logger/Logger';
import {randomUUID} from 'crypto';

const logger = new Logger('createImageRecords');
logger.info('Start');
const drizzle = await globalServiceFactory.drizzle();
const db = await drizzle.getDb();
const schema = db._.fullSchema;
const imageService = await globalServiceFactory.image();
const argusCheckinsService = await globalServiceFactory.argusCheckin();
const items = await argusCheckinsService.getLatest({
  perPage: 10000,
  type: ArgusCheckinType.Status,
});
for (const row of items.items.reverse()) {
  const status = argusStatusCheckinValidator.parse(row);
  const existing = await db.query.entries.findFirst({
    where: (t, op) => op.eq(t.externalId, status.externalId),
  });
  if (existing) {
    console.log(`Record with external id '${existing.externalId}' already exists, id: ${existing.id}, skipping`);
    continue;
  }

  let imageId: number | null = null;
  const image = status.data.photos?.[0];
  if (image) {
    const imageRecord = await imageService.createFromUrl(image.href, image.id + '.jpg', ImageType.Entry);
    imageId = imageRecord.id;
  }
  const newEntry: EntryRow = {
    id: randomUUID(),
    type: EntryType.Post,
    externalId: status.externalId,
    externalSource: ExternalSource.Argus,
    title: null,
    note: status.data.note,
    time: status.createdAt,
    createdAt: status.createdAt,
    updatedAt: status.updatedAt,
    visibility: EntryVisibility.Public,
    userId: 1,
    deletedAt: null,
    workoutId: null,
    outdoorRunId: null,
    outdoorWalkId: null,
    imageId: imageId,
    weightId: null,
    healthkitId: null,
    healthkitAnchor: null,
    healthkitAnchors_3_0: null,
    healthkitSource: null,
    healthkitSourceName: null,
    healthkitDevice: null,
    healthkitDeviceName: null,
    mealId: null,
  };
  await db.insert(schema.entries).values(newEntry);
}
await globalServiceFactory.cleanup();
logger.info('Done');
