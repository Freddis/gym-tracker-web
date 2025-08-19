import {globalServiceFactory} from 'src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';
import {EntryType} from '../../src/backend/services/EntryService/types/EntryType';
import {eq, isNull} from 'drizzle-orm';
import {EntryRow} from '../../src/backend/services/DrizzleService/types/EntryRow';
import {NewModel} from '../../src/backend/types/NewModel';
import {EntryVisibility} from '../../src/backend/services/EntryService/types/EntryVisibility';

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
  const entry: NewModel<EntryRow> = {
    type: EntryType.Workout,
    createdAt: workout.createdAt,
    updatedAt: workout.updatedAt,
    userId: workout.userId,
    deletedAt: workout.deletedAt,
    workoutId: workout.id,
    weightId: null,
    visibility: EntryVisibility.Public,
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
  const entry: NewModel<EntryRow> = {
    type: EntryType.Weight,
    createdAt: weight.createdAt,
    updatedAt: weight.updatedAt,
    userId: weight.userId,
    deletedAt: weight.deletedAt,
    workoutId: null,
    weightId: weight.id,
    visibility: EntryVisibility.Public,
  };
  await db.insert(schema.entries).values(entry);
}
await globalServiceFactory.cleanup();

