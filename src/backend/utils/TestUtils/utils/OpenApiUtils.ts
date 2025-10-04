
import {OpenApiMethod} from 'snap-on-openapi';
import {UserRow} from '../../../services/DrizzleService/types/UserRow';
import {BusinessUtils} from './BusinessUtils/BusinessUtils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OpenApiResponse = {status: number, body: any}

export class OpenApiUtils {

  static async delete(route: string, data?: object) {
    const response = await this.sendRequest(route, OpenApiMethod.DELETE, undefined, data);
    return response;
  }

  static async deleteWithUser(route: string, user: UserRow, data?: object) {
    const response = await this.sendRequest(route, OpenApiMethod.DELETE, user, data);
    return response;
  }

  static async get(route: string, headers?: Record<string, string>): Promise<OpenApiResponse> {
    const response = await this.sendRequest(route, OpenApiMethod.GET, undefined, undefined, headers);
    return response;
  }

  static async post(route: string, data?: object) {
    const response = await this.sendRequest(route, OpenApiMethod.POST, undefined, data);
    return response;
  }

  static async getWithUser(route: string, user: UserRow): Promise<OpenApiResponse> {
    const response = await this.sendRequest(route, OpenApiMethod.GET, user);
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
    data?: object,
    headers?: Record<string, string>,
  ): Promise<OpenApiResponse> {
    const factory = BusinessUtils.getFactory();
    const auth = await factory.auth();
    const openApi = await factory.openApi();
    const jwt = user ? auth.createToken(user) : '';
    const url = `http://localhost${openApi.getBasePath()}${route}`;
    const req = new Request(url, {
      method,
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
        ...headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    const response = await openApi.processRootRoute(req);
    return response;
  }
}
