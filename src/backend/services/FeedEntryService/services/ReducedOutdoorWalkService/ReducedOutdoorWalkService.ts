import {and, inArray} from 'drizzle-orm';
import {DrizzleService, AppDbSchema} from '../../../DrizzleService/DrizzleService';
import {BaseEntry} from '../../../EntryService/types/Entry';
import {EntryType} from '../../../EntryService/types/EntryType';
import {IFeedEntryService} from '../../types/IFeedEntryService';
import {ReducedOutdoorWalk} from './types/ReducedOutdoorWalk';
import {OutdoorWalkFeedEntry} from '../../types/OutdoorWalkFeedEntry';

export class ReducedOutdoorWalkService implements IFeedEntryService<EntryType.OutdoorWalk> {
  protected drizzle: DrizzleService;
  protected table: AppDbSchema['outdoorWalks'];

  constructor(drizzle: DrizzleService) {
    this.drizzle = drizzle;
    this.table = drizzle.getSchema().outdoorWalks;
  }

  getRelationKey() {
    return 'outdoorWalkId' as const;
  }

  construct(row: BaseEntry, value: ReducedOutdoorWalk): OutdoorWalkFeedEntry {
    return {
      ...row,
      outdoorWalk: value,
      type: EntryType.OutdoorWalk,
    };
  }
  async loadMap(ids: number[]): Promise<Map<number, ReducedOutdoorWalk>> {
    const db = await this.drizzle.getDb();
    const rows: ReducedOutdoorWalk[] = await db.select()
    .from(this.table)
    .where(
      and(
        inArray(this.table.id, ids),
      )
    );
    return rows.reduce((acc, cur) => acc.set(cur.id, cur), new Map<number, ReducedOutdoorWalk>());
  }

}
