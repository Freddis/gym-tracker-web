import fs from 'fs/promises';
import path from 'path';

import {RedisServiceConfig} from './types/RedisServiceConfig';
import {Logger} from '../../utils/Logger/Logger';
import {TypeOf, ZodObject, ZodRawShape} from 'zod';

interface RedisEntry {
  value: string;
  expiresAt?: number;
}

type RedisStore = Record<string, RedisEntry>;

// todo: when a Redis cluster allocated in prod, connect it to real Redis
export class RedisService {
  protected config: RedisServiceConfig;
  protected logger: Logger;
  protected dbFilePath: string;

  constructor(config: RedisServiceConfig) {
    this.config = config;
    this.logger = new Logger(RedisService.name);
    this.dbFilePath = path.join(config.tmpFolderPath, 'redis.json');
  }

  async setObject(key: string, value: object, ttl?: number): Promise<void> {
    await this.setString(key, JSON.stringify(value), ttl);
  }
  async getValidatedObject<T extends ZodRawShape>(key: string, validator: ZodObject<T>): Promise<TypeOf<ZodObject<T>> | null> {
    const value = await this.getString(key);
    if (!value) {
      return null;
    }
    return validator.parse(JSON.parse(value));
  }

  async setString(
    key: string,
    value: string,
    ttl?: number,
  ): Promise<void> {
    const store = await this.loadStore();

    store[key] = {
      value,
      expiresAt: ttl ? Date.now() + ttl * 1000 : undefined,
    };

    await this.saveStore(store);
  }

  async getString(key: string): Promise<string | null> {
    const store = await this.loadStore();

    const entry = store[key];

    if (!entry) {
      return null;
    }

    if (
      entry.expiresAt !== undefined &&
      entry.expiresAt <= Date.now()
    ) {
      delete store[key];
      await this.saveStore(store);

      return null;
    }

    return entry.value;
  }

  protected async loadStore(): Promise<RedisStore> {
    try {
      await fs.mkdir(this.config.tmpFolderPath, {recursive: true});
      const content = await fs.readFile(this.dbFilePath, 'utf8');
      return JSON.parse(content) as RedisStore;
    } catch (error: unknown) {
      this.logger.error('Failed to load store', error);
      return {};
    }
  }

  protected async saveStore(store: RedisStore): Promise<void> {
    await fs.mkdir(this.config.tmpFolderPath, {recursive: true});

    await fs.writeFile(
      this.dbFilePath,
      JSON.stringify(store, null, 2),
      'utf8',
    );
  }
}
