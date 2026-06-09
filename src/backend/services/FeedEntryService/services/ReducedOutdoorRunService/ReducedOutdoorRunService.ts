import {and, inArray} from 'drizzle-orm';
import {DrizzleService, AppDbSchema} from '../../../DrizzleService/DrizzleService';
import {BaseEntry} from '../../../EntryService/types/Entry';
import {EntryType} from '../../../EntryService/types/EntryType';
import {IFeedEntryService} from '../../types/IFeedEntryService';
import {OutdoorRunFeedEntry} from '../../types/OutdoorRunFeedEntry';
import {ReducedOutdoorRun} from './types/ReducedOutdoorRun';

export class ReducedOutdoorRunService implements IFeedEntryService<EntryType.OutdoorRun> {
  protected drizzle: DrizzleService;
  protected table: AppDbSchema['outdoorRuns'];

  constructor(drizzle: DrizzleService) {
    this.drizzle = drizzle;
    this.table = drizzle.getSchema().outdoorRuns;
  }

  getRelationKey() {
    return 'outdoorRunId' as const;
  }

  construct(row: BaseEntry, value: ReducedOutdoorRun): OutdoorRunFeedEntry {
    return {
      ...row,
      outdoorRun: value,
      type: EntryType.OutdoorRun,
    };
  }
  async loadMap(ids: number[]): Promise<Map<number, ReducedOutdoorRun>> {
    const db = await this.drizzle.getDb();
    const rows: ReducedOutdoorRun[] = await db.select()
    .from(this.table)
    .where(
      and(
        inArray(this.table.id, ids),
      )
    );
    return rows.reduce((acc, cur) => acc.set(cur.id, cur), new Map<number, ReducedOutdoorRun>());
  }
}
