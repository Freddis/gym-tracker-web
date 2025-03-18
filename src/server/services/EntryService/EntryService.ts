import {db} from 'src/server/drizzle/db';
import {Entry} from 'src/server/model/Entry/Entry';

export class EntryService {

  async getLatest(params: {limit: number;}): Promise<Entry[]> {
    const result = await db.query.entries.findMany({limit: params.limit});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return result as any;
  }
}
