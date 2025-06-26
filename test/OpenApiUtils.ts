import {User} from '../src/backend/model/User/User';
import {openApiRoutes} from '../src/backend/utils/openApiRoutes';
import {BusinessUtils} from './BusinessUtils';

export class OpenApiUtils {
  static async postWithUser(
    route: string,
    user: User,
    data?: object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<{status: number, body: any}> {
    const factory = BusinessUtils.getFactory();
    const auth = await factory.auth();
    const openApi = await factory.openApi();
    const jwt = auth.createToken(user);
    openApi.addRouteMap(openApiRoutes);
    const req = new Request(`http://localhost/${openApi.getBasePath()}${route}`, {
      method: 'POST',
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
