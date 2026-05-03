import {and, eq, inArray, isNull, like, SQL} from 'drizzle-orm';
import {AppDbSchema, DrizzleService} from '../DrizzleService/DrizzleService';
import {Food} from './types/Food';
import {ImageService} from '../ImageService/ImageService';
import {randomUUID} from 'crypto';
import {Image} from '../ImageService/types/Image';
import {ImageType} from '../../types/ImageType';
import {FoodUpsertDto} from './types/FoodUpsertDto';
import {UserModelService} from '../../types/ModelService/UserModelService';
import {PgColumn} from 'drizzle-orm/pg-core';
import {FoodFilter} from './types/FoodFilter';
import {ActionError} from '../ApiService/errors/ActionError';
import {ActionErrorCode} from '../ApiService/types/ActionErrorCode';

export class FoodService extends UserModelService<string, AppDbSchema['food']['$inferSelect'], Food, FoodFilter> {
  protected imageService: ImageService;

  constructor(drizzle: DrizzleService, imageService: ImageService) {
    super(drizzle);
    this.imageService = imageService;
  }

  async upsert(userId: number, food: FoodUpsertDto): Promise<Food> {
    const db = await this.drizzle.getDb();
    const schema = this.drizzle.getSchema();
    let image: Image | null = null;
    if (food.image?.data) {
      image = await this.imageService.createFromBase64(food.image.data, randomUUID(), ImageType.Food);
    }
    const existing = await db.query.food.findFirst({
      where: (t, op) => op.and(
        op.eq(t.id, food.id),
      ),
    });

    if (existing && existing.userId !== userId) {
      throw new ActionError(ActionErrorCode.NoOwnerShip);
    }
    const entity: typeof schema.food.$inferInsert = {
      id: food.id,
      userId: userId,
      name: food.name,
      description: food.description,
      imageId: image?.id,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      servingSize: food.servingSize,
      servingSizeUnit: food.servingSizeUnit,
      createdAt: food.createdAt,
      updatedAt: food.updatedAt,
      deletedAt: food.deletedAt,
    };
    if (existing) {
      await db.update(schema.food).set(entity).where(eq(schema.food.id, existing.id));
    } else {
      await db.insert(schema.food).values(entity);
    }
    const decorated = await this.decorate(entity.id);
    return decorated;
  }

  protected override getTable(): AppDbSchema['food'] {
    return this.drizzle.getSchema().food;
  }

  protected override getWhere(params: Partial<FoodFilter>): SQL<unknown> | undefined {
    const where = and(
      params.ids ? inArray(this.getTable().id, params.ids) : undefined,
      params.search ? like(this.getTable().name, `%${params.search}%`) : undefined,
      isNull(this.getTable().deletedAt),
    );
    return where;
  }

  protected override async decorateRows(rows: AppDbSchema['food']['$inferSelect'][]): Promise<Food[]> {
    const imageIds = rows.map((x) => x.imageId).filter((x) => x !== null);
    const images = await this.imageService.getMany({ids: imageIds});
    const imageMap = images.reduce((acc, cur) => acc.set(cur.id, cur), new Map<number, Image>());
    const result = rows.map((row) => {
      return {
        id: row.id,
        name: row.name,
        description: row.description,
        image: imageMap.get(row.imageId ?? 0) ?? null,
        calories: row.protein * 4 + row.carbs * 4 + row.fat * 9,
        protein: row.protein,
        carbs: row.carbs,
        fat: row.fat,
        servingSize: row.servingSize,
        servingSizeUnit: row.servingSizeUnit,
        components: [],
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        deletedAt: row.deletedAt ?? null,
      };
    });
    return result;
  }

  protected override getOrderBy(): PgColumn | SQL | SQL.Aliased {
    return this.getTable().name;
  }
}
