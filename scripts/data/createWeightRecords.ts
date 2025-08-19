import 'strap-on-openapi';
import {ArgusCheckinType} from '../../src/backend/services/DrizzleService/types/ArgusCheckinRow/types/ArgusCheckinType';
import {argusWeightCheckinValidator} from '../../src/backend/services/DrizzleService/types/ArgusCheckinRow/validators/ArgusWeightCheckin';
import {globalServiceFactory} from '../../src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';
import {WeightRow} from '../../src/backend/services/DrizzleService/types/WeightRow';
import {NewModel} from '../../src/backend/types/NewModel';

const drizzle = await globalServiceFactory.drizzle();
const db = await drizzle.getDb();
const schema = db._.fullSchema;
const argusCheckinsService = await globalServiceFactory.argusCheckin();
const items = await argusCheckinsService.getLatest({
  perPage: 10000,
  type: ArgusCheckinType.Weight,
});
for (const row of items.items.reverse()) {
  const weight = argusWeightCheckinValidator.parse(row);
  const existing = await db.query.weight.findFirst({
    where: (t, op) => op.eq(t.externalId, weight.externalId),
  });
  if (existing) {
    console.log(`Record with external id '${existing.externalId}' already exists, id: ${existing.id}, skipping`);
    continue;
  }

  const newWeight: NewModel<WeightRow> = {
    externalId: weight.externalId,
    createdAt: weight.createdAt,
    updatedAt: null,
    weight: weight.data.value,
    userId: 1,
    units: 'Kg',
    deletedAt: null,
  };
  await db.insert(schema.weight).values(newWeight);
}

await globalServiceFactory.cleanup();
