import {WeightUnits} from '../../../common/enums/WeightUnits';
import {NewModel} from '../../../common/types/NewModel';
import {WeightRow} from '../DrizzleService/types/WeightRow';
import {DrizzleService} from '../DrizzleService/DrizzleService';
import {Weight} from './types/Weight';
import {UserRow} from '../DrizzleService/types/UserRow';
export class WeightService {
  protected drizzle: DrizzleService;

  constructor(drizzle: DrizzleService) {
    this.drizzle = drizzle;
  }

  async create(user: UserRow, weight: number): Promise<Weight> {
    const db = await this.drizzle.getDb();
    const schema = this.drizzle.getSchema();
    const obj: NewModel<WeightRow> = {
      externalId: null,
      createdAt: new Date(),
      updatedAt: null,
      weight: weight,
      userId: user.id,
      units: WeightUnits.Kg,
      deletedAt: null,
    };
    const result = await db.insert(schema.weight).values(obj).returning();
    if (!result[0]) {
      throw new Error('Unable to get inserted weight');
    }
    return result[0];
  }
}
