import {OpenApiMethod} from 'strap-on-openapi';
import {UserRow} from '../../../services/DrizzleService/types/UserRow';
import {openApiRoutes} from '../../../services/ApiService/utils/openApiRoutes';
import {BusinessUtils} from './BusinessUtils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OpenApiResponse = {status: number, body: any}

export class OpenApiUtils {
  static async get(route: string): Promise<OpenApiResponse> {
    const response = await this.sendRequest(route, OpenApiMethod.GET);
    return response;
  }

  static async put(route: string, user: UserRow, data?: object): Promise<OpenApiResponse> {
    const response = await this.sendRequest(route, OpenApiMethod.PUT, user, data);
    return response;
  }

  static async request(
    route: string,
    method: OpenApiMethod,
    data?: object
  ): Promise<OpenApiResponse> {
    const response = await this.sendRequest(route, method, undefined, data);
    return response;
  }

  static async postWithUser(
    route: string,
    user: UserRow,
    data?: object
  ): Promise<OpenApiResponse> {
    const response = await this.sendRequest(route, OpenApiMethod.POST, user, data);
    return response;
  }

  protected static async sendRequest(
    route: string,
    method: OpenApiMethod,
    user?: UserRow,
    data?: object
  ): Promise<OpenApiResponse> {
    const factory = BusinessUtils.getFactory();
    const auth = await factory.auth();
    const openApi = await factory.openApi();
    const jwt = user ? auth.createToken(user) : '';
    openApi.addRouteMap(openApiRoutes);
    const req = new Request(`http://localhost/${openApi.getBasePath()}${route}`, {
      method,
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    const response = await openApi.processRootRoute(req);
    return response;
  }
}
