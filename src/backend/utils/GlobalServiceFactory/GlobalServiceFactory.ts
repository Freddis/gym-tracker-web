import {AuthService} from 'src/backend/services/AuthService/AuthService';
import {DrizzleService} from 'src/backend/services/DrizzleService/DrizzleService';
import {serverConfig} from '../ServerConfig/config';
import {ApiService} from '../../services/ApiService/ApiService';
import {ImageService} from '../../services/ImageService/ImageService';

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

}
