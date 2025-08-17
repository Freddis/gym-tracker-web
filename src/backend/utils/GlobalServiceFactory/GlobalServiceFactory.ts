import {AuthService} from 'src/backend/services/AuthService/AuthService';
import {DrizzleService} from 'src/backend/services/DrizzleService/DrizzleService';
import {serverConfig} from '../ServerConfig/config';
import {ApiService} from '../../services/ApiService/ApiService';
import {ImageService} from '../../services/ImageService/ImageService';
import {existsSync, mkdirSync} from 'fs';
import {ArgusService} from '../../services/ArgusService/ArgusService';
import {ExerciseService} from '../../services/ExerciseService/ExerciseService';
import {ServerConfig} from '../ServerConfig/ServerConfig';
import {DbSyncService} from '../../services/DbSyncService/DbSyncService';
import {ManagerService} from '../../services/ManagerService/ManagerService';
import {WorkoutService} from 'src/backend/services/WorkoutService/WorkoutService';

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
      this.drizzleCached = new DrizzleService(serverConfig.services.drizzle);
    }
    return this.drizzleCached;
  }

  async auth(): Promise<AuthService> {
    const drizzle = await this.drizzle();
    const managerService = new ManagerService(drizzle);
    return new AuthService(serverConfig.services.auth, drizzle, managerService);
  }

  async openApi(): Promise<ReturnType<ApiService['createOpenApi']>> {
    const helper = new ApiService(await this.drizzle());
    const api = helper.createOpenApi();
    return api;
  }

  async argus(): Promise<ArgusService | null> {
    const config = this.config.services.argus;
    if (!config) {
      return null;
    }
    const tempPath = config.tempFolderPath;
    if (!existsSync(tempPath)) {
      mkdirSync(tempPath);
    }
    const service = new ArgusService(await this.getExerciseService(), await this.drizzle(), config);
    return service;
  }

  async getExerciseService(): Promise<ExerciseService> {
    return new ExerciseService(await this.drizzle());
  }

  async getWorkoutService(): Promise<WorkoutService> {
    return new WorkoutService(await this.drizzle(), await this.getExerciseService());
  }

  async dbSync(): Promise<DbSyncService | null> {
    const localDrizzle = await this.drizzle();
    if (!this.config.services.dbSync) {
      return null;
    }
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    this.prodDrizzleCached = this.prodDrizzleCached ?? new DrizzleService(this.config.services.dbSync);
    const prodDrizzle = this.prodDrizzleCached;
    const service = new DbSyncService(localDrizzle, prodDrizzle);
    return service;
  }

}
