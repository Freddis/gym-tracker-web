import {AuthService} from 'src/backend/services/AuthService/AuthService';
import {DrizzleService} from 'src/backend/services/DrizzleService/DrizzleService';
import {serverConfig} from '../ServerConfig/config';
import {ApiService} from '../../services/ApiService/ApiService';
import {ImageService} from '../../services/ImageService/ImageService';
import {realpathSync, existsSync, mkdirSync} from 'fs';
import {join} from 'path';
import {ArgusService} from '../../services/ArgusService/ArgusService';
import {ArgusServiceConfig} from '../../services/ArgusService/types/ArgusServiceConfig';
import {EnvHelper} from '../EnvHelper/EnvHelper';
import {ExerciseService} from '../../services/ExerciseService/ExerciseService';
import {ServerConfig} from '../ServerConfig/ServerConfig';
import {DrizzleServiceConfig} from '../../services/DrizzleService/types/DrizzleServiceConfig';
import {DbSyncService} from '../../services/DbSyncService/DbSyncService';

export class GlobalServiceFactory {
  protected allocatedDestroyables = {drizzle: false};
  protected drizzleCached?: DrizzleService;
  protected prodDrizzleCached?: DrizzleService;
  protected config: ServerConfig;

  constructor(config: ServerConfig) {
    this.config = config;
  }

  async cleanup() {
    if (this.drizzleCached) {
      await this.drizzleCached.end();
    }
    if (this.prodDrizzleCached) {
      await this.prodDrizzleCached.end();
    }
  }

  async image() {
    const drizzle = await this.drizzle();
    return new ImageService(drizzle);
  }

  async drizzle(): Promise<DrizzleService> {
    if (!this.drizzleCached) {
      this.drizzleCached = new DrizzleService(serverConfig.database);
    }
    return this.drizzleCached;
  }

  async auth(): Promise<AuthService> {
    return new AuthService(serverConfig.services.auth, await this.drizzle());
  }

  async openApi(): Promise<ReturnType<ApiService['createOpenApi']>> {
    const helper = new ApiService(await this.drizzle());
    const api = helper.createOpenApi();
    return api;
  }

  async argus() {
    const tempPath = join(realpathSync('.'), '/temp');
    if (!existsSync(tempPath)) {
      mkdirSync(tempPath);
    }
    const config: ArgusServiceConfig = {
      tempFolderPath: tempPath,
      seededUser: {
        name: EnvHelper.getString('SEED_USER_NAME'),
        email: EnvHelper.getString('SEED_USER_EMAIL'),
        password: EnvHelper.getString('SEED_USER_PASSWORD'),
        argusAuthToken: EnvHelper.getString('AUTH_TOKEN'),
      },
    };
    const service = new ArgusService(await this.drizzle(), config);
    return service;
  }

  async getExerciseService(): Promise<ExerciseService> {
    return new ExerciseService(await this.drizzle());
  }

  async dbSync() {
    const localDrizzle = await this.drizzle();
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const prodConf: DrizzleServiceConfig = {
      host: EnvHelper.getString('PROD_DB_HOST'),
      port: EnvHelper.getNumber('PROD_DB_PORT'),
      user: EnvHelper.getString('PROD_DB_USER'),
      password: EnvHelper.getString('PROD_DB_PASSWORD'),
      database: EnvHelper.getString('PROD_DB_DATABASE'),
      ssl: EnvHelper.getBoolean('PROD_DB_SSL'),
      schema: EnvHelper.getString('PROD_DB_SCHEMA'),
    };
    this.prodDrizzleCached = this.prodDrizzleCached ?? new DrizzleService(prodConf);
    const prodDrizzle = this.prodDrizzleCached;
    const service = new DbSyncService(localDrizzle, prodDrizzle);
    return service;
  }

}
