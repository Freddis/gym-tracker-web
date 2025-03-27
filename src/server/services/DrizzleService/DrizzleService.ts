import {db, pgClient} from 'src/server/drizzle/db';

export class DrizzleService {
  protected static connected = false;
  async getDb(): Promise<typeof db> {
    if (!DrizzleService.connected) {
      DrizzleService.connected = true;
      await pgClient.connect();
    }
    return db;
  }

  async end() {
    pgClient.end();
  }
}
