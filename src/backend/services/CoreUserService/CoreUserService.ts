import {and, desc, eq, inArray, SQL} from 'drizzle-orm';
import {CoreUser} from './types/CoreUser';
import {ModelService} from '../../types/ModelService/ModelService';
import {UserRow} from '../DrizzleService/types/UserRow';
import {PgColumn} from 'drizzle-orm/pg-core';
import {UserFilter} from './types/UserFilter';
import {ImageService} from '../ImageService/ImageService';
import {AppDbSchema, DrizzleService} from '../DrizzleService/DrizzleService';
import {Image} from '../ImageService/types/Image';
import {EntryVisibility} from '../EntryService/types/EntryVisibility';
import {Gender} from '../../types/Gender';
import {Country} from '../../types/Country';
import {HeightUnit} from '../../types/HeightUnit';
import {WeightUnit} from '../../types/WeightUnit';
import {TemperatureUnit} from '../../types/TemperatureUnit';
import {DistanceUnit} from '../../types/DistanceUnit';
import {SemiPartial} from '../../types/SemiPartial';

export class CoreUserService extends ModelService<number, UserRow, CoreUser, UserFilter> {
  protected imageService: ImageService;

  constructor(drizzle: DrizzleService, imageService: ImageService) {
    super(drizzle);
    this.imageService = imageService;
  }

  async create(data: {
    name: string;
    email: string;
    hashedPassword: string;
    gender: Gender,
    country: Country,
    birthDate: Date,
    height: number,
  }): Promise<CoreUser> {
    const db = await this.drizzle.getDb();
    const schema = this.drizzle.getSchema();
    const row: typeof schema.users.$inferInsert = {
      name: data.name,
      email: data.email,
      password: data.hashedPassword,
      createdAt: new Date(),
      gender: data.gender,
      visibility: EntryVisibility.Public,
      height: data.height,
      heightUnit: HeightUnit.Cm,
      weightUnit: WeightUnit.Kg,
      temperatureUnit: TemperatureUnit.C,
      distanceUnit: DistanceUnit.Km,
      birthDate: data.birthDate,
      country: data.country,
    };
    const users = await db.insert(schema.users).values(row).returning();
    const user = users[0];
    if (!user) {
      throw new Error("User hasn't been inserted");
    }
    return this.decorateRow(user);
  }

  async update(id: number, data: SemiPartial<CoreUser, 'id' | 'profilePicture'>) {
    const db = await this.drizzle.getDb();
    const update: Partial<AppDbSchema['users']['$inferSelect']> = {
      updatedAt: new Date(),
      name: data.name,
      email: data.email,
      password: data.password,
      height: data.height,
      heightUnit: data.heightUnit,
      weightUnit: data.weightUnit,
      temperatureUnit: data.temperatureUnit,
      distanceUnit: data.distanceUnit,
      gender: data.gender,
      birthDate: data.birthDate,
      country: data.country,
      note: data.note,
      visibility: data.visibility,
    };
    if (data.profilePicture !== undefined) {
      update.imageId = data.profilePicture?.id ?? null;
    }
    await db.update(this.getTable()).set(update).where(
      eq(this.getTable().id, id)
    );
  }

  protected override getTable() {
    return this.drizzle.getSchema().users;
  }

  protected override getWhere(params: Partial<UserFilter>): SQL<unknown> | undefined {
    const where = and(
      params.ids ? inArray(this.getTable().id, params.ids) : undefined,
      params.email ? eq(this.getTable().email, params.email) : undefined
    );
    return where;
  }

  protected override async decorateRows(rows: UserRow[]): Promise<CoreUser[]> {
    const images = await this.imageService.getMany({ids: rows.map((x) => x.imageId ?? 0)});
    const imageMap = images.reduce((acc, cur) => acc.set(cur.id, cur), new Map<number, Image>());
    return rows.map((x) => {
      const profilePicture = imageMap.get(x.imageId ?? 0) ?? null;
      const result: CoreUser = {
        id: x.id,
        name: x.name,
        password: x.password,
        email: x.email,
        profilePicture: profilePicture,
        height: x.height,
        heightUnit: x.heightUnit,
        weightUnit: x.weightUnit,
        temperatureUnit: x.temperatureUnit,
        distanceUnit: x.distanceUnit,
        gender: x.gender,
        birthDate: x.birthDate,
        visibility: x.visibility,
        country: x.country,
        note: x.note,
      };
      return result;
    });
  }
  protected override getOrderBy(): PgColumn | SQL | SQL.Aliased {
    return desc(this.getTable().id);
  }
}
