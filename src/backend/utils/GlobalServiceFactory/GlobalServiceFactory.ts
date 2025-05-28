import {OpenApiErrorCode} from 'src/backend/services/OpenApiService/enums/OpenApiErrorCode';
import {OpenApiService} from 'src/backend/services/OpenApiService/OpenApiService';
import {OpenApiError} from 'src/backend/services/OpenApiService/types/errors/OpenApiError';
import {AuthService} from 'src/backend/services/AuthService/AuthService';
import {DrizzleService} from 'src/backend/services/DrizzleService/DrizzleService';
import {EntryService} from 'src/backend/services/EntryService/EntryService';
import {AppOpenApiRouteContexts} from 'src/common/types/AppOpenApiRouteContexts';
import {serverConfig} from '../ServerConfig/config';
import {AppOpenApiRouteTypes} from 'src/common/types/AppOpenApiRouteTypes';
import {AppOpenApiRequestServices} from 'src/common/types/AppOpenApiRequestServices';
import {WorkoutService} from 'src/backend/services/WorkoutService/WorkoutService';
import {ExerciseService} from 'src/backend/services/ExerciseService/ExerciseService';
import {WeightService} from '../../services/WeightService/WeightService';

export class GlobalServiceFactory {
  protected allocatedDestroyables = {drizzle: false};
  protected drizzleCached?: DrizzleService;

  async cleanup() {
    if (this.allocatedDestroyables.drizzle) {
      const service = await this.drizzle();
      await service.end();
    }

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

  async openApi(): Promise<OpenApiService<AppOpenApiRouteTypes, AppOpenApiRouteContexts>> {
    return new OpenApiService< AppOpenApiRouteTypes, AppOpenApiRouteContexts>({
      User: async (opts) => {
        const auth = await this.auth();
        const viewer = await auth.getClientFromRequest(opts.request);
        if (!viewer) {
          throw new OpenApiError(OpenApiErrorCode.unauthorized);
        }
        return {
          services: await this.createRequestServices(),
          viewer,
        };
      },
      Public: async () => ({
        services: await this.createRequestServices(),
      }),
      Manager: async () => ({}),
    });
  }

  protected async createRequestServices(): Promise<AppOpenApiRequestServices> {
    const drizzle = await this.drizzle();
    const services: AppOpenApiRequestServices = {
      auth: new AuthService(serverConfig.services.auth, drizzle),
      models: {
        entry: new EntryService(drizzle),
        workout: new WorkoutService(drizzle),
        exercise: new ExerciseService(drizzle),
        weight: new WeightService(drizzle),
      },
    };
    return services;
  }

}
