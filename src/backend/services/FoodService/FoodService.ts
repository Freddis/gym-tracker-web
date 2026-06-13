import {and, desc, eq, gt, ilike, inArray, isNull, or, sql, SQL} from 'drizzle-orm';
import {AppDb, AppDbSchema, DrizzleService} from '../DrizzleService/DrizzleService';
import {Food} from './types/Food';
import {ImageService} from '../ImageService/ImageService';
import {randomUUID} from 'crypto';
import {Image} from '../ImageService/types/Image';
import {ImageType} from '../../types/ImageType';
import {FoodUpsertDto} from './types/FoodUpsertDto';
import {UserModelService} from '../../types/ModelService/UserModelService';
import {alias, PgColumn} from 'drizzle-orm/pg-core';
import {FoodFilter} from './types/FoodFilter';
import {ActionError} from '../ApiService/errors/ActionError';
import {ActionErrorCode} from '../ApiService/types/ActionErrorCode';
import {FoodComponent} from './types/FoodComponent';
import {EmptyMealError} from './types/EmptyMealError';
import {FatsecretService} from '../FatsecretService/FatsecretService';
import {ServingSizeUnit} from './types/ServingSizeUnit';
import {EntryVisibility} from '../EntryService/types/EntryVisibility';
import {Logger} from '../../utils/Logger/Logger';
import {FoodSource} from './types/FoodSource';
import {PaginatedResult} from '../ApiService/types/PaginatedResult';
export class FoodService extends UserModelService<string, AppDbSchema['food']['$inferSelect'], Food, FoodFilter> {
  protected imageService: ImageService;
  protected fatsecretService: FatsecretService;
  protected logger = new Logger(FoodService.name);
  constructor(drizzle: DrizzleService, imageService: ImageService, fatsecretService: FatsecretService) {
    super(drizzle);
    this.imageService = imageService;
    this.fatsecretService = fatsecretService;
  }


  async findFood(params: {query?: string, page?: number}): Promise<PaginatedResult<Food>> {
    const db = await this.drizzle.getDb();
    const page = params.page ?? 1;
    const limit = 30;
    const offset = (page - 1) * limit;
    const where = and(
      eq(this.getTable().visibility, EntryVisibility.Public),
      isNull(this.getTable().copiedFromId),
      isNull(this.getTable().deletedAt),
    );
    const food2 = alias(this.getTable(), 'f2');
    const rows = await db.select({
      food: this.getTable(),
      copy: food2,
    })
    .from(db._.fullSchema.food)
    .where(where)
    .leftJoin(food2, eq(this.getTable().copiedFromId, food2.id))
    .orderBy(desc(this.getTable().createdAt))
    .limit(limit)
    .offset(offset);
    const count = await db.$count(this.getTable(), where);
    const ids = rows.map((x) => x.copy?.id ?? x.food.id);
    const result: PaginatedResult<Food> = {
      items: await this.decorateMany(ids),
      info: {
        page,
        count,
        pageSize: limit,
      },
    };
    return result;
  }


  async scanBarcode(userId: number, barcode: number): Promise<Food | null> {
    const existing = await this.getByBarcode(barcode, userId);
    if (existing) {
      this.logger.info('Food already exists', {barcode, userId, existing});
      return existing;
    }
    const result = await this.fatsecretService.searchFoodByBarcode(barcode);
    if (!result) {
      return null;
    }

    const calories = result.calories ?? null;
    const protein = result.protein ?? 0;
    const carbs = result.carbs ?? 0;
    const fat = result.fat ?? 0;
    const foodUpsertDto: FoodUpsertDto = {
      id: randomUUID(),
      name: result.name,
      description: result.brand ?? '',
      image: null,
      calories: calories ? (Math.round(calories * 10) / 10) : null,
      protein: Math.round(protein * 10) / 10,
      carbs: Math.round(carbs * 10) / 10,
      fat: Math.round(fat * 10) / 10,
      servingSize: null,
      servingSizeUnit: ServingSizeUnit.Gram,
      components: [],
      visibility: EntryVisibility.Public,
      createdAt: new Date(),
      updatedAt: null,
      isMeal: false,
      deletedAt: null,
      barcode: barcode,
      copiedFromId: null,
    };
    const db = await this.drizzle.getDb();
    const food = await db.transaction(async (tx) => {
      return await this.upsertInTransaction(null, foodUpsertDto, tx, FoodSource.Fatsecret, result.id.toString());
    });
    return food;
  }

  async getByBarcode(barcode: number, userId: number): Promise<Food | null> {
    const db = await this.drizzle.getDb();
    const food = await db.query.food.findFirst({
      where: (t, op) => op.and(
        op.eq(t.barcode, barcode),
        op.isNull(t.deletedAt),
        op.or(
          op.eq(t.userId, userId),
          op.isNull(t.userId),
        ),
      ),
      orderBy: (t) => [desc(t.userId)],
    });

    if (!food) {
      return null;
    }
    const decorated = await this.decorate(food.id);
    return decorated;
  }

  async upsert(userId: number, food: FoodUpsertDto): Promise<Food> {
    const db = await this.drizzle.getDb();
    return await db.transaction(async (tx) => {
      return await this.upsertInTransaction(userId, food, tx);
    });
  }

  async upsertMany(userId: number, food: FoodUpsertDto[]): Promise<Food[]> {
    const db = await this.drizzle.getDb();
    return await db.transaction(async (tx) => {
      const result: Food[] = [];
      for (const item of food) {
        const newFood = await this.upsertInTransaction(userId, item, tx);
        result.push(newFood);
      }
      return result;
    });
  }

  protected async upsertInTransaction(
    userId: number | null,
    food: FoodUpsertDto,
    db: AppDb,
    source?: FoodSource,
    externalId?: string
  ): Promise<Food> {
    if (food.isMeal && food.components.length === 0) {
      throw new EmptyMealError();
    }
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
    // todo: come up with good way to prevent addition of recursive meals
    const entity: typeof schema.food.$inferInsert = {
      id: food.id,
      userId: userId,
      name: food.name,
      description: food.description,
      imageId: image?.id,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      calories: food.calories,
      barcode: food.barcode,
      copiedFromId: food.copiedFromId,
      visibility: food.visibility,
      servingSize: food.servingSize,
      servingSizeUnit: food.servingSizeUnit,
      createdAt: food.createdAt,
      updatedAt: food.updatedAt,
      deletedAt: food.deletedAt,
      isMeal: food.isMeal,
      source: source,
      externalId: externalId,
    };
    if (existing) {
      await db.update(schema.food).set(entity).where(eq(schema.food.id, existing.id));
    } else {
      await db.insert(schema.food).values(entity);
    }
    await db.delete(schema.foodComponents).where(eq(schema.foodComponents.mealId, entity.id));
    if (food.components.length > 0) {
      const newRows: AppDbSchema['foodComponents']['$inferInsert'][] = food.components.map((x) => ({
        mealId: entity.id,
        componentId: x.food.id,
        amount: x.amount,
        unit: x.unit,
      }));
      await db.insert(schema.foodComponents).values(newRows);
    }
    const decorated = await this.decorate(entity.id);
    return decorated;
  }

  protected override getTable(): AppDbSchema['food'] {
    return this.drizzle.getSchema().food;
  }


  protected override getWhere(params: Partial<FoodFilter>): SQL<unknown> | undefined {
    const where = and(
      params.ids ? inArray(this.getTable().id, [...new Set(params.ids)]) : undefined,
      params.search ? ilike(this.getTable().name, `%${params.search}%`) : undefined,
      params.includeDeleted ? undefined : isNull(this.getTable().deletedAt),
      params.isDish ? eq(this.getTable().isMeal, params.isDish) : undefined,
      params.updatedAfter ? or(
        gt(this.getTable().updatedAt, params.updatedAfter),
        gt(this.getTable().createdAt, params.updatedAfter),
        gt(this.getTable().deletedAt, params.updatedAfter),
      ) : undefined,
      params.includeDeleted ? isNull(this.getTable().deletedAt) : undefined,
    );
    return where;
  }

  protected override async executeQuery(
    db: AppDb,
    userId: number,
    offset: number,
    limit: number,
    where: SQL<unknown> | undefined
  ): Promise<{rows: AppDbSchema['food']['$inferSelect'][], count: number}> {
    const rows = await db.select(
      {
        id: this.getTable().id,
        userId: this.getTable().userId,
        name: this.getTable().name,
        description: this.getTable().description,
        imageId: this.getTable().imageId,
        protein: this.getTable().protein,
        carbs: this.getTable().carbs,
        calories: this.getTable().calories,
        fat: this.getTable().fat,
        servingSizeUnit: this.getTable().servingSizeUnit,
        servingSize: this.getTable().servingSize,
        isMeal: this.getTable().isMeal,
        createdAt: this.getTable().createdAt,
        updatedAt: this.getTable().updatedAt,
        deletedAt: this.getTable().deletedAt,
        source: this.getTable().source,
        externalId: this.getTable().externalId,
        barcode: this.getTable().barcode,
        visibility: this.getTable().visibility,
        copiedFromId: this.getTable().copiedFromId,
      }
    )
      .from(this.getTable())
      .leftJoin(
        db._.fullSchema.mealFoodComponents,
        eq(this.getTable().id, db._.fullSchema.mealFoodComponents.foodId)
      )
      .leftJoin(
        db._.fullSchema.meals,
        eq(db._.fullSchema.mealFoodComponents.mealId, db._.fullSchema.meals.id)
      )
      .leftJoin(
        db._.fullSchema.entries,
        eq(db._.fullSchema.entries.mealId, db._.fullSchema.meals.id)
      )
      .where(
        and(
          where,
          eq(this.getTable().userId, userId),
        )
      ).groupBy(
        this.getTable().id
      )
      .orderBy(
        sql`GREATEST(MAX(${db._.fullSchema.entries.createdAt}), ${this.getTable().createdAt}) desc nulls last`,
      )
      .limit(limit)
      .offset(offset);
    const count = await db.$count(this.getTable(), and(
      where,
      or(
        eq(this.getTable().userId, userId),
      )
    ));
    return {rows: rows, count};
  }

  protected override async decorateRows(rows: AppDbSchema['food']['$inferSelect'][]): Promise<Food[]> {
    const imageIds = rows.map((x) => x.imageId).filter((x) => x !== null);
    const images = await this.imageService.getMany({ids: imageIds});
    const imageMap = images.reduce((acc, cur) => acc.set(cur.id, cur), new Map<string, Image>());
    const componentsMap = await this.getFoodComponents(rows.map((x) => x.id));
    const result = rows.map((row) => {
      const components = componentsMap.get(row.id) ?? [];
      const food: Food = {
        id: row.id,
        name: row.name,
        description: row.description,
        image: imageMap.get(row.imageId ?? '') ?? null,
        calories: row.calories ?? (row.protein * 4 + row.carbs * 4 + row.fat * 9),
        protein: row.protein,
        carbs: row.carbs,
        fat: row.fat,
        visibility: row.visibility,
        servingSizeUnit: row.servingSizeUnit,
        servingSize: row.servingSize,
        components: components,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        deletedAt: row.deletedAt ?? null,
        isMeal: row.isMeal,
        barcode: row.barcode,
        copiedFromId: row.copiedFromId,
      };
      return food;
    });
    return result;
  }

  protected async getFoodComponents(mealIds: string[]): Promise<Map<string, FoodComponent[]>> {
    if (mealIds.length === 0) {
      return new Map<string, FoodComponent[]>();
    }
    const db = await this.drizzle.getDb();
    const foodComponents = await db.query.foodComponents.findMany({
      where: (t, op) => op.and(
        inArray(t.mealId, [...new Set(mealIds)]),
      ),
    });
    if (foodComponents.length === 0) {
      return new Map<string, FoodComponent[]>();
    }
    const foodIds = foodComponents.map((x) => x.componentId);
    const food = await this.decorateMany(foodIds);
    const foodMap = food.reduce((acc, cur) => acc.set(cur.id, cur), new Map<string, Food>());

    const componentsMap = foodComponents.reduce((acc, cur) => {
      const food = foodMap.get(cur.componentId);
      if (!food) {
        throw new Error(`Food ${cur.componentId} not found for component: ${cur.id}`);
      }
      const component: FoodComponent = {
        amount: cur.amount,
        unit: cur.unit,
        food: food,
      };

      const existing = acc.get(cur.mealId) ?? [];
      existing.push(component);
      acc.set(cur.mealId, existing);
      return acc;
    }, new Map<string, FoodComponent[]>());
    return componentsMap;
  }

  protected override getOrderBy(): PgColumn | SQL | SQL.Aliased {
    return this.getTable().name;
  }

}
