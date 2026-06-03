import {TableConfig, SQL, desc, inArray, and} from 'drizzle-orm';
import {PgTable, PgColumn} from 'drizzle-orm/pg-core';
import {ModelService} from '../../types/ModelService/ModelService';
import {IdColumn} from '../../types/ModelService/types/IdColumn';
import {AppDbSchema, DrizzleService} from '../DrizzleService/DrizzleService';
import {BaseEntry, MealEntry} from '../EntryService/types/Entry';
import {EntryType} from '../EntryService/types/EntryType';
import {IEntryService} from '../EntryService/types/IEntryService';
import {Meal} from './types/Meal';
import {MealEntryUpsertDto} from '../EntryService/types/EntryUpsertDto';
import {FoodComponent} from '../FoodService/types/FoodComponent';
import {FoodService} from '../FoodService/FoodService';
import {Food} from '../FoodService/types/Food';
import {Filter} from '../../types/ModelService/types/Filter';

export class MealService extends ModelService<number, AppDbSchema['meals']['$inferSelect'], Meal> implements IEntryService<EntryType.Meal> {
  protected foodService: FoodService;

  constructor(drizzle: DrizzleService, foodService: FoodService) {
    super(drizzle);
    this.foodService = foodService;
  }
  protected override getTable(): PgTable<TableConfig> & {id: IdColumn<number>;} {
    return this.drizzle.getSchema().meals;
  }

  protected override getWhere(filter: Partial<Filter<number>>): SQL<unknown> | undefined {
    return and(
      filter.ids ? inArray(this.getTable().id, [...new Set(filter.ids)]) : undefined,
    );
  }

  protected override async decorateRows(rows: AppDbSchema['meals']['$inferSelect'][]): Promise<Meal[]> {
    const foodComponents = await this.getFoodComponents(rows.map((x) => x.id));
    const meals: Meal[] = rows.map((row) => {
      const meal: Meal = {
        id: row.id,
        type: row.type,
        food: foodComponents.get(row.id) ?? [],
      };
      return meal;
    });
    return meals;
  }

  protected async getFoodComponents(mealIds: number[]): Promise<Map<number, FoodComponent[]>> {
    if (mealIds.length === 0) {
      return new Map();
    }
    const db = await this.drizzle.getDb();
    const foodComponents = await db.query.mealFoodComponents.findMany({
      where: (t, op) => op.and(
        inArray(t.mealId, mealIds),
      ),
    });
    if (foodComponents.length === 0) {
      return new Map();
    }
    const foodIds = foodComponents.map((x) => x.foodId);
    const food = await this.foodService.decorateMany(foodIds);
    // const food = await this.decorateMany(foodIds);
    const foodMap = food.reduce((acc, cur) => acc.set(cur.id, cur), new Map<string, Food>());

    const componentsMap = foodComponents.reduce((acc, cur) => {
      const food = foodMap.get(cur.foodId);
      if (!food) {
        throw new Error(`Food ${cur.foodId} not found for component: ${cur.id}`);
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
    }, new Map<number, FoodComponent[]>());
    return componentsMap;
  }

  protected override getOrderBy(): PgColumn | SQL | SQL.Aliased {
    return desc(this.getTable().id);
  }

  async upsertOne(userId: number, dto: MealEntryUpsertDto): Promise<{id: number; value: Meal;}> {
    const item = dto.meal;
    const db = await this.drizzle.getDb();
    const schema = this.drizzle.getSchema();
    const result = await db.insert(schema.meals).values({
      userId: userId,
      type: item.type,
    }).returning();
    const inserted = result[0];
    if (!inserted) {
      throw new Error('Meal not found');
    }
    const foodComponents: AppDbSchema['mealFoodComponents']['$inferInsert'][] = item.food.map((food) => {
      const row: AppDbSchema['mealFoodComponents']['$inferInsert'] = {
        mealId: inserted.id,
        amount: food.amount,
        unit: food.unit,
        foodId: food.food.id,
      };
      return row;
    });
    await db.insert(schema.mealFoodComponents).values(foodComponents);
    const meal: Meal = {
      id: inserted.id,
      type: inserted.type,
      food: [],
    };
    return {
      id: meal.id,
      value: meal,
    };

  }

  getRelationKey(): 'mealId' {
    return 'mealId';
  }
  construct(row: BaseEntry, value: Meal): MealEntry {
    return {
      ...row,
      meal: value,
      type: EntryType.Meal,
    };
  }

}
