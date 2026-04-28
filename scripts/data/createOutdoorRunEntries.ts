import {ArgusCheckinType} from '../../src/backend/services/DrizzleService/types/ArgusCheckinRow/types/ArgusCheckinType';
import {globalServiceFactory} from '../../src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';
import {Logger} from '../../src/backend/utils/Logger/Logger';
import {ArgusCheckinSubtype} from '../../src/backend/services/DrizzleService/types/ArgusCheckinRow/types/ArgusCheckinSubtype';
import {
  argusRunCheckinValidator,
} from '../../src/backend/services/DrizzleService/types/ArgusCheckinRow/validators/ArgusRunCheckin';

const logger = new Logger('createOutdoorRunEntries');
logger.info('Start');
const entryService = await globalServiceFactory.entry();
const userService = await globalServiceFactory.user();

const argusCheckinsService = await globalServiceFactory.argusCheckin();
const items = await argusCheckinsService.getLatest({
  perPage: 10000,
  type: ArgusCheckinType.Activity,
  subtype: ArgusCheckinSubtype.Run,
});
const user = await userService.getById(1);
if (!user) {
  throw new Error('User not found');
}
let counter = 0;
for (const row of items.items.reverse()) {
  const activityValidationResult = argusRunCheckinValidator.safeParse(row);
  if (!activityValidationResult.success) {
    logger.info('Zod Error:', {issues: activityValidationResult.error.issues});
    logger.info('Invalid activity data', {activity: row.data});
    process.exit(1);
    continue;
  }
  const activity = activityValidationResult.data;
  // const existing = await entryService.getByExternalId(activity.externalId);
  // if (existing) {
  //   console.log(`Record with external id '${existing.externalId}' already exists, id: ${existing.id}, skipping`);
  //   continue;
  // }
  counter++;

  const upsertDto = await argusCheckinsService.convertRunDataToUpsertDto(activity);

  const entry = await entryService.upsert(user.id, [upsertDto]);
  logger.info(`Entry ${counter}:`, {activity, upsertDto, entry});
}
await globalServiceFactory.cleanup();
logger.info(`Done. Processed ${counter} entries`);
