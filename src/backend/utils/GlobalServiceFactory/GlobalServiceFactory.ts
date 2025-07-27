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

export class GlobalServiceFactory {
  protected allocatedDestroyables = {drizzle: false};
  protected drizzleCached?: DrizzleService;

  async cleanup() {
    if (this.allocatedDestroyables.drizzle) {
      const service = await this.drizzle();
      await service.end();
    }
  }

  async image() {
    const drizzle = await this.drizzle();
    return new ImageService(drizzle);
  }

  async drizzle(): Promise<DrizzleService> {
    this.allocatedDestroyables.drizzle = true;
    if (!this.drizzleCached) {
      this.drizzleCached = new DrizzleService();
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

}
