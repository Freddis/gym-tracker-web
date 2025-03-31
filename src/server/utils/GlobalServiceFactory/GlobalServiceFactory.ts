import {OpenApiErrorCode} from 'src/server/services/OpenApiService/enums/OpenApiErrorCode';
import {OpenApiService} from 'src/server/services/OpenApiService/OpenApiService';
import {OpenApiError} from 'src/server/services/OpenApiService/types/errors/OpenApiError';
import {RequestServices} from 'src/server/utils/GlobalServiceFactory/types/RequestServices';
import {AuthService} from 'src/server/services/AuthService/AuthService';
import {DrizzleService} from 'src/server/services/DrizzleService/DrizzleService';
import {EntryService} from 'src/server/services/EntryService/EntryService';
import {AppOpenApiRouteContexts} from 'src/types/AppOpenApiRouteContexts';
import {serverConfig} from '../ServerConfig/config';
import {AppOpenApiRouteTypes} from 'src/types/AppOpenApiRouteTypes';

export class GlobalServiceFactory {

  async drizzle(): Promise<DrizzleService> {
    return new DrizzleService();
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

  protected async createRequestServices(): Promise<RequestServices> {
    const services: RequestServices = {
      auth: new AuthService(serverConfig.services.auth, await this.drizzle()),
      models: {
        entry: new EntryService(await this.drizzle()),
      },
    };
    return services;
  }

}
