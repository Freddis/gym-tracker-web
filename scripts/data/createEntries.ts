import {globalServiceFactory} from 'src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';
import {EntryType} from '../../src/backend/services/EntryService/types/EntryType';
import {eq, isNull} from 'drizzle-orm';
import {EntryRow} from '../../src/backend/services/DrizzleService/types/EntryRow';
import {EntryVisibility} from '../../src/backend/services/EntryService/types/EntryVisibility';
import {randomUUID} from 'crypto';

const service = await globalServiceFactory.argus();
if (!service) {
  console.log('Argus service is not configured. Exiting.');
  process.exit(1);
}

const drizzle = await globalServiceFactory.drizzle();
const db = await drizzle.getDb();
const schema = db._.fullSchema;
const workoutsToAdd = await db.select()
.from(schema.entries)
.rightJoin(schema.workouts, eq(schema.workouts.id, schema.entries.workoutId))
.where(
  isNull(schema.entries.id)
)
.orderBy(
  schema.workouts.id
);

for (const row of workoutsToAdd) {
  const workout = row.workouts;
  const entry: EntryRow = {
    id: randomUUID(),
    time: workout.start,
    type: EntryType.Workout,
    title: null,
    note: null,
    externalId: null,
    externalSource: null,
    createdAt: workout.createdAt,
    updatedAt: workout.updatedAt,
    userId: workout.userId,
    deletedAt: workout.deletedAt,
    workoutId: workout.id,
    weightId: null,
    imageId: null,
    outdoorRunId: null,
    outdoorWalkId: null,
    visibility: EntryVisibility.Public,
    healthkitId: null,
    healthkitAnchor: null,
    healthkitAnchors_3_0: null,
    healthkitSource: null,
    healthkitSourceName: null,
    healthkitDevice: null,
    healthkitDeviceName: null,
    mealId: null,
    calorieGoalId: null,
  };
  await db.insert(schema.entries).values(entry);
}

const weightToAdd = await db.select()
.from(schema.entries)
.rightJoin(schema.weight, eq(schema.weight.id, schema.entries.weightId))
.where(
  isNull(schema.entries.id)
)
.orderBy(
  schema.weight.id
);

for (const row of weightToAdd) {
  const weight = row.weight;
  const entry: EntryRow = {
    id: randomUUID(),
    time: weight.createdAt,
    type: EntryType.Weight,
    createdAt: weight.createdAt,
    updatedAt: weight.updatedAt,
    userId: weight.userId,
    deletedAt: weight.deletedAt,
    workoutId: null,
    outdoorRunId: null,
    outdoorWalkId: null,
    imageId: null,
    weightId: weight.id,
    visibility: EntryVisibility.Public,
    title: null,
    note: null,
    externalId: null,
    externalSource: null,
    healthkitId: null,
    healthkitAnchor: null,
    healthkitAnchors_3_0: null,
    healthkitSource: null,
    healthkitSourceName: null,
    healthkitDevice: null,
    healthkitDeviceName: null,
    mealId: null,
    calorieGoalId: null,
  };
  await db.insert(schema.entries).values(entry);
}
await globalServiceFactory.cleanup();

