import {WeightUnits} from '../../../common/enums/WeightUnits';
import {NewModel} from '../../../common/types/NewModel';
import {User} from '../../model/User/User';
import {Weight} from '../../model/Weight/Weight';
import {DrizzleService} from '../DrizzleService/DrizzleService';

export class WeightService {
  protected drizzle: DrizzleService;

  constructor(drizzle: DrizzleService) {
    this.drizzle = drizzle;
  }

  async create(user: User, weight: number): Promise<Weight> {
    const db = await this.drizzle.getDb();
    const schema = this.drizzle.getSchema();
    const obj: NewModel<Weight> = {
      externalId: null,
      createdAt: new Date(),
      updatedAt: null,
      weight: weight,
      userId: user.id,
      units: WeightUnits.Kg,
      deletedAt: null,
    };
    const result = await db.insert(schema.weight).values(obj).returning();

    return result[0];
  }
}
