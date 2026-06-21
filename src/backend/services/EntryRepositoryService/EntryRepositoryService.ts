import {SQL, and, between, desc, eq, gt, gte, inArray, isNull, lte, or} from 'drizzle-orm';
import {PgColumn} from 'drizzle-orm/pg-core';
import {ModelService} from '../../types/ModelService/ModelService';
import {EntryRow} from '../DrizzleService/types/EntryRow';
import {EntryFilter} from '../EntryService/types/EntryFilter';
import {EntryType} from '../EntryService/types/EntryType';
import {ImageService} from '../ImageService/ImageService';
import {DrizzleService} from '../DrizzleService/DrizzleService';
import {UserService} from '../UserService/UserService';
import {EntryVisibility} from '../EntryService/types/EntryVisibility';

export class EntryRepositoryService extends ModelService<string, EntryRow, EntryRow, EntryFilter<EntryType>> {
  protected imageService: ImageService;
  protected userService: UserService;

  constructor(drizzle: DrizzleService, imageService: ImageService, userService: UserService) {
    super(drizzle);
    this.imageService = imageService;
    this.userService = userService;
  }

  protected override getTable() {
    return this.drizzle.getSchema().entries;
  }

  protected override getWhere<T extends EntryType>(params: Partial<EntryFilter<T>>): SQL<unknown> | undefined {
    const where = and(
      params?.ids ? inArray(this.getTable().id, params.ids) : undefined,
      params?.externalId ? inArray(this.getTable().externalId, params.externalId) : undefined,
      params?.weightIds ? inArray(this.getTable().weightId, params.weightIds) : undefined,
      params?.workoutIds ? inArray(this.getTable().workoutId, params.workoutIds) : undefined,
      params?.type ? inArray(this.getTable().type, params.type) : undefined,
      params?.userId ? or(
        inArray(this.getTable().userId, params.userId),
        params?.includePublic ? eq(this.getTable().visibility, EntryVisibility.Public) : undefined,
      ) : undefined,
      params?.includeDeleted ? undefined : isNull(this.getTable().deletedAt),
      params?.after ? gte(this.getTable().time, params.after) : undefined,
      params?.before ? lte(this.getTable().time, params.before) : undefined,
      params?.updatedAfter ? or(
        gt(this.getTable().updatedAt, params.updatedAfter),
        gt(this.getTable().createdAt, params.updatedAfter),
        gt(this.getTable().deletedAt, params.updatedAfter),
      ) : undefined,
      params?.date ? between(
        this.getTable().time,
         new Date(params.date.getFullYear(), params.date.getMonth(), params.date.getDate()),
         new Date(params.date.getFullYear(), params.date.getMonth(), params.date.getDate() + 1)
        ) : undefined,
    );
    return where;
  }

  protected override async decorateRows(rows: EntryRow[]): Promise<EntryRow[]> {
    return rows;
  }

  protected override getOrderBy(): PgColumn | SQL | SQL.Aliased {
    return desc(this.getTable().time);
  }
}
