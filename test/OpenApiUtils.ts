import {User} from '../src/backend/model/User/User';
import {OpenApiErrorResponse} from '../src/backend/services/OpenApiService/types/responses/OpenApiErrorResponse';
import {openApiRoutes} from '../src/backend/utils/openApiRoutes';
import {BusinessUtils} from './BusinessUtils';

export class OpenApiUtils {
  protected static baseUrl = 'http://localhost/api/v1';

  static async postWithUser(
    route: string,
    user: User,
    data?: object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<{status: number; body: OpenApiErrorResponse}| {status: 200, body: any}> {
    const factory = BusinessUtils.getFactory();
    const auth = await factory.auth();
    const openApi = await factory.openApi();
    const jwt = auth.createToken(user);
    openApi.addRoutesByMap(openApiRoutes);
    const req = new Request(`http://localhost/api/v1${route}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    const response = await openApi.processRootRoute('/api/v1', req);
    return response;
  }

}
