import {and, eq, isNull, like} from 'drizzle-orm';
import {User} from 'src/backend/model/User/User';
import {DrizzleService} from 'src/backend/services/DrizzleService/DrizzleService';
import {NewModel} from 'src/common/types/NewModel';
import {Logger} from 'src/common/utils/Logger/Logger';
import {exerciseData} from './data/argusExercisesJson';
import {Exercise} from 'src/backend/model/Exercise/Exercise';
import {workoutEntryValidator} from 'src/backend/model/Entry/validators/WorkoutEntry';
import {WorkoutExercise} from 'src/backend/model/WorkoutExercise/WorkoutExercise';
import {existsSync, readFileSync, realpathSync, writeFileSync} from 'fs';
import {z} from 'zod';
import {argusResponseValidator} from './validators/ArgusResponse';
import {join} from 'path';
import {ArgusCheckin, argusCheckinValidator} from './validators/ArgusCheckin';
import {ArgusServiceConfig} from './types/ArgusServiceConfig';

export class ArgusService {
  protected drizzle: DrizzleService;
  protected config: ArgusServiceConfig;

  constructor(drizzle: DrizzleService, config: ArgusServiceConfig) {
    this.drizzle = drizzle;
    this.config = config;
  }

  async wipeData() {
    const logger = new Logger('Wipe Data');
    const db = await this.drizzle.getDb();
    const schema = this.drizzle.getSchema();
    await db.delete(schema.entries);
    await db.delete(schema.exercises).where(
      isNull(schema.exercises.userId)
    );
    const seededUser = await this.getSeededUser();
    if (!seededUser) {
      logger.info('Seeded user not found, no one to wipe data from.');
      return;
    }
    await db.delete(schema.exercises).where(
      eq(schema.exercises.userId, seededUser.id)
    );
    await db.delete(schema.workoutExerciseSets).where(
      eq(schema.workoutExerciseSets.userId, seededUser.id)
    );
    await db.delete(schema.workoutExercises).where(
      eq(schema.workoutExercises.userId, seededUser.id)
    );
    await db.delete(schema.workouts).where(
      eq(schema.workouts.userId, seededUser.id)
    );
    logger.info('Done');
  }

  async seedUser() {
    const logger = new Logger('Seed User');
    const seededUser = await this.getSeededUser();
    if (seededUser) {
      logger.info('Seeded user already exists');
      return;
    }
    const db = await this.drizzle.getDb();
    const schema = this.drizzle.getSchema();
    const user: NewModel<User> = {
      name: this.config.seededUser.name,
      email: this.config.seededUser.email,
      password: this.config.seededUser.password,
      createdAt: new Date(),
      updatedAt: null,
    };
    await db.insert(schema.users).values(user);
    logger.info('Done');
  }

  async createExerciseLibrary() {
    const logger = new Logger('CreateExerciseLibrary');
    logger.info('Starting argus static data processing');
    const db = await this.drizzle.getDb();
    const dbSchema = this.drizzle.getSchema();

    logger.info('Clearing existing exercises');
    await db.delete(dbSchema.exercises);
    let i = 1;
    const map = new Map<string, NewModel<Exercise & {count: number}>>();
    const exercises: NewModel<Exercise>[] = [];
    for (const exercise of exerciseData.exercises) {
      logger.info(`Processing ${i++} /${exerciseData.exercises.length} `);
      const nameParts = exercise.name.split('(');
      const baseName = nameParts[0].trim().replaceAll('_', ' ').trim();
      const extension = nameParts[1] ? ' (' + nameParts[1].replaceAll('_', ', ') : '';
      const name = baseName + extension;
      // const params = exercise.params.split('|').map((x) => Number(x)).filter((x) => !Number.isNaN(x));
      const params = [0];
      const imgName = exercise.name.replaceAll(' ', '+');
      const image = `http://images.skyhealth.com/fb_app_images/fitness_img_v5.0/${imgName}-a.jpg`;
      const image2 = `http://images.skyhealth.com/fb_app_images/fitness_img_v5.0/${imgName}-b.jpg`;

      const row: NewModel<Exercise> = {
        createdAt: new Date(),
        name: name,
        description: exercise.description.map((item, i) => `<${i + 1}>${item}`).join(''),
        equipmentId: 0,
        difficulty: Number(0),
        params: params,
        images: [image, image2],
        updatedAt: null,
        userId: null,
        copiedFromId: null,
        parentExerciseId: null,
      };
      exercises.push(row);
      const parent = map.get(baseName);
      if (!parent) {
        map.set(baseName, {...row, count: 1});
        continue;
      }
      parent.count++;
    }

    for (const row of exercises) {
      const baseName = row.name.split('(')[0].trim().replaceAll('_', ' ').trim();
      const visualParent = map.get(baseName);
      if (visualParent && visualParent.count > 1) {
        const result = await db.select()
          .from(dbSchema.exercises)
          .where(
            and(
              isNull(dbSchema.exercises.parentExerciseId),
              like(dbSchema.exercises.name, baseName)
            )
          );
        const record = result[0];
        if (record) {
          row.parentExerciseId = record.id;
        } else {
          const res = await db.insert(dbSchema.exercises).values({
            ...visualParent,
            name: baseName,
          }).returning({id: dbSchema.exercises.id});
          row.parentExerciseId = res[0].id;
        }
      }
      await db.insert(dbSchema.exercises).values(row);
    }
    logger.info('Done');
  }

  async importWorkouts(): Promise<void> {
    const logger = new Logger('ImportWorkouts');
    logger.info('Importing workouts from argus entries');
    const db = await this.drizzle.getDb();
    const dbSchema = this.drizzle.getSchema();
    const user = await this.getSeededUser();
    if (!user) {
      logger.info('Seeded user not found');
      return;
    }

    const renameMap: Record<string, string> = {
      'Full preacher': 'EZ Curl Bar Biceps Curl (Preacher, Underhand Grip, Sitting)',
      'Smith weighted bridge': 'Weighted Bridge',
    };
    const workoutEntriesRows = await db.query.entries.findMany({
      where: (table, ops) => ops.eq(table.subtype, 'workout'),
    });
    const workoutEntries = workoutEntriesRows.map((x) => workoutEntryValidator.parse(x));
    let i = 1;
    for (const item of workoutEntries) {
      logger.info(`Processing ${i++} /${workoutEntries.length} `);
      const workout: typeof dbSchema.workouts.$inferInsert = {
        createdAt: new Date(item.data.start),
        calories: item.data.calories ?? 0,
        start: new Date(item.data.start),
        end: new Date(item.data.end),
        userId: user.id,
        externalId: item.externalId,
      };
      const exercises = item.data.exercises ?? [];
      const ids = await db.insert(dbSchema.workouts).values(workout).returning({id: dbSchema.workouts.id});
      const workoutId = ids[0].id;
      for (const exercise of exercises) {
        const name = exercise.exercise_name.replaceAll('_', ', ');
        let exerciseId = 0;
        const libraryExercise = await db.query.exercises.findFirst({
          where: (t, op) => op.eq(t.name, name),
        });
        if (!libraryExercise) {
          if (exercise.exercise_type === 'custom_exercise' && renameMap[name]) {
        // continue;
            const anotherName = renameMap[name];
            const libraryExercise = await db.query.exercises.findFirst({
              where: (t, op) => op.eq(t.name, anotherName),
            });
            if (!libraryExercise) {
              throw new Error(`Library exercise for name ${anotherName} not found`);
            }
            libraryExercise.name = name;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {id, ...insertData} = libraryExercise;
            const ids = await db.insert(dbSchema.exercises).values({
              ...insertData, name, userId: user.id,
            }).returning({id: dbSchema.exercises.id});
            exerciseId = ids[0].id;
          } else {
            throw new Error(`Library exercise for name ${name} not found`);
          }
        } else {
          const userExercise = await db.query.exercises.findFirst({
            where: (t, op) => op.and(
              op.eq(t.name, name),
              op.eq(t.userId, user.id)
            ),
          });

          let id = userExercise?.id;
          if (!id) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete ((libraryExercise as any).id);
            const ids = await db.insert(dbSchema.exercises).values({
              ...libraryExercise, name, userId: user.id,
            }).returning({id: dbSchema.exercises.id});
            id = ids[0].id;
          }
          exerciseId = id;
        }
        const workoutExercise: NewModel<WorkoutExercise> = {
          createdAt: new Date(),
          updatedAt: null,
          userId: user.id,
          workoutId: workoutId,
          exerciseId: exerciseId,
        };
        const result = await db.insert(dbSchema.workoutExercises)
          .values(workoutExercise)
          .returning({
            id: dbSchema.workoutExercises.id,
          });
        const workoutExerciseId = result[0].id;
        const sets = exercise.sets;
        for (const set of sets) {
          const userSet : typeof dbSchema.workoutExerciseSets.$inferInsert = {
            createdAt: workout.start,
            start: workout.start,
            end: workout.start,
            workoutId: workoutId,
            exerciseId: exerciseId,
            weight: set.weight,
            reps: set.reps,
            userId: user.id,
            workoutExerciseId: workoutExerciseId,
          };
          await db.insert(dbSchema.workoutExerciseSets).values(userSet);
        }
      }
    }
    logger.info('Done');
  }

  async downloadEntries(reDownloadCheckins: boolean) {
    const logger = new Logger('ArgusCheckinsDownload');
    const authtoken = this.config.seededUser.argusAuthToken;
    const tempPath = this.config.tempFolderPath;

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
    const seedPath = join(tempPath, '_final.json');
    logger.info('Wrtings seed file to: ', {seedPath});
    checkinsReponse.checkins = checkins;
    writeFileSync(seedPath, JSON.stringify(checkinsReponse));
    logger.info('Done');
  }
  async importEntries(): Promise<void> {
    const path = realpathSync(join(this.config.tempFolderPath, '_final.json'));
    return this.importEntriesFromPath(path);
  }

  protected async importEntriesFromPath(filePath: string): Promise<void> {
    const logger = new Logger('Import Checkins');
    logger.info('Starting');
    const db = await this.drizzle.getDb();
    const dbSchema = this.drizzle.getSchema();

    logger.info('Reading path', {filePath});
    const entries: Omit<typeof dbSchema.entries.$inferInsert, 'id'>[] = [];
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

    logger.info('Inserting entries');
    for (const entry of entries) {
      await db.insert(dbSchema.entries).values(entry);
    }
  }
  protected async getSeededUser(): Promise<User| null> {
    const db = await this.drizzle.getDb();
    const seedUser = await db.query.users.findFirst({
      where: (t, op) => op.eq(t.email, this.config.seededUser.email),
    });
    return seedUser ?? null;
  }
}
